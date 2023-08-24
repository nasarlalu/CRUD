import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { addUser } from '../redux/reducers'
import axios from 'axios';
import validator from 'validator';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col } from 'react-bootstrap'




const SignUp = () => {

    //redux vars
    // const userList = useSelector((state) => state.users.value);
    // const dispatch = useDispatch();
    // dispatch(addUser({ id: userList[userList.length - 1].id + 1, name: name, number: number, email: email, dob: dob, age: age, gender: gender, image: image }))


    //routing vars
    const navigate = useNavigate()

    //state vars
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({});




    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleImageDrop,
        accept: 'image/*',
        multiple: false,
    });

    function handleImageDrop(acceptedFiles) {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
    };

    //adding inputted value to the state
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(name, phoneNumber, email, dob, age, gender, image);

        const newErrors = validateInputs()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.error(newErrors, 'validation errors');
            return;
        }
        setErrors({});

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('dob', dob);
            formData.append('phoneNumber', phoneNumber);
            formData.append('gender', gender);

            if (image) {
                formData.append('image', image); // Only append if image is not null
            }

            const response = await axios.post('http://localhost:3001/api/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            console.log('User created:', response.data);
            navigate('/account-created')
        } catch (err) {
            console.error(err, 'Error while signup in frontend');
        }
    }


    const handleAge = (e) => {
        let inputAge = e.target.value;
        setDob(inputAge)
        //age-calculation
        let dob = new Date(inputAge);
        let today = new Date();
        if (inputAge == today) {
            alert("still not born")
        }
        else {
            let age = today.getTime() - dob.getTime();
            age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
            let newAge = age
            setAge(newAge)
        }
    }

    function validateInputs() {
        const newErrors = {};
        const validGenders = ['male', 'female', 'other'];

        if (!validator.isLength(name, { min: 2 })) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!validator.isEmail(email)) {
            newErrors.email = 'Invalid email format or undefined';
        }

        if (!validator.isInt(age.toString(), { min: 1 })) {
            newErrors.age = 'Age is invalid or undefined';
        }

        if (!validator.isDate(dob)) {
            newErrors.dob = 'Dob is incorrect or undefined ';
        }

        if (!validGenders.includes(gender.toLowerCase())) {
            newErrors.gender = 'Gender is not selected';
        }

        if (!validator.isMobilePhone(phoneNumber, 'any')) {
            newErrors.phoneNumber = 'Invalid phone number format or Undefined';
        }

        return newErrors;
    };


    useEffect(() => {
        console.log(errors, 'validation errors');
    }, [errors])



    return (
        <section className="signUpPage">
            <div className='curvedContainer purpleBg section-fit d-flex align-items-center'>
                <Container>
                    <Row className='align-items-center'>
                        <form onSubmit={handleSubmit} className='d-flex justify-content-equally'>
                            <Col md={4} className="mx-2">
                                <div className="mb-3">
                                    <label className="form-label label-text">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="enter your name" />
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label label-text">Phone Number</label>
                                    <input type="number" className="form-control" id="number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder="enter your phone number" />
                                    {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label label-text">Email address</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="enter your mail" />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                            </Col>

                            <Col md={4} className="mx-2">

                                <div className="mb-3">
                                    <label className="form-label label-text">Date Of Birth</label>
                                    <input type="date" className="form-control" id="dob" value={dob} onChange={handleAge} placeholder="enter your dob" />
                                    {errors.dob && <span className="error">{errors.dob}</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label label-text">Age</label>
                                    <input type="text" className="form-control" value={age} placeholder="Age calculated automatically" disabled />
                                    {errors.dob && <span className="error">{errors.dob}</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label label-text">Gender :</label>

                                    <div className='segment-control'>
                                        <input type="radio" className="btn-check active" name="options-outlined" id="male-outlined" autoComplete="off" value="male" onChange={(e) => { setGender(e.target.value) }} />
                                        <label className="btn  segment-btn" htmlFor="male-outlined">Male</label>

                                        <input type="radio" className="btn-check" name="options-outlined" id="female-outlined" autoComplete="off" value="female" onChange={(e) => { setGender(e.target.value) }} />
                                        <label className="btn segment-btn" htmlFor="female-outlined">Female</label>

                                        <input type="radio" className="btn-check" name="options-outlined" id="others-outlined" autoComplete="off" value="other" onChange={(e) => { setGender(e.target.value) }} />
                                        <label className="btn  segment-btn" htmlFor="others-outlined">Others</label>
                                    </div>

                                    {errors.gender && <span className="error">{errors.gender}</span>}

                                </div>

                            </Col>

                            <Col md={4} className='mx-2'>

                                <div className="mb-3">
                                    <label className="form-label label-text">Upload Your Image</label>
                                    <div className="file-input" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '20px' }}>
                                            <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="">
                                    <button type="submit" className="create-btn btn btn-primary" >Create Account</button>
                                </div>

                            </Col>


                        </form>

                    </Row>

                </Container>
            </div>
        </section >
    );
}

export default SignUp;