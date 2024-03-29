import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { VscCloudUpload } from 'react-icons/vsc'
import { useDropzone } from 'react-dropzone';

const CreateComponent = () => {

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({});
    const [errorTxt, setErrorTxt] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [prevImage, setPrevImage] = useState(null)


    const onHide = () => setModalShow(!modalShow);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleImageDrop,
        // accept: 'image/*',
        multiple: false,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
    });

    function handleImageDrop(acceptedFiles) {
        if (!acceptedFiles || acceptedFiles.length === 0) {
            alert('Please select an image to upload.');
            return;
        }


        let file = acceptedFiles[0]

        if (file.size >= 1048576) {
            alert('Image size should be under 1MB.')
        }

        else {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPrevImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }


    // img.onload = function () {
    //     if (img.width > 1200 || img.height > 1200) {
    //         alert('Image dimensions should be 500x500 or below.');
    //     } else {
    //     }
    // };





    //adding inputted value to the state
    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validateInputs()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.error(newErrors, 'validation errors');
            return;
        }
        setErrors({});

        const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SIGNUP_API : process.env.REACT_APP_PROD_SIGNUP_API;

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

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            alert('User created successfully')

            setName('')
            setAge('')
            setDob('')
            setEmail('')
            setImage('')
            setGender('')
            setPhoneNumber('')
            setPrevImage('')
        } catch (err) {
            console.error(err, 'Error while signup in frontend');
            setModalShow(true)
            setErrorTxt(err.response.data.error)
        }
    }

    const handleAge = (e) => {
        let inputAge = e.target.value;
        setDob(inputAge)
        //age-calculation
        let dob = new Date(inputAge);
        let today = new Date();
        if (inputAge === today) {
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

        if (!validator.isMobilePhone(phoneNumber, 'en-IN',)) {
            newErrors.phoneNumber = 'Invalid phone number format or Undefined or non-indian Number';
        }

        if (image == null || undefined) {
            newErrors.image = 'Image is not selected';
        }

        return newErrors;
    };

    useEffect(() => {
        console.error(errors, 'validation errors');
    }, [errors])


    return (
        <section className='createCrudSection'>
            <Container>

                <Row className='mobOnly'>
                    <Col sm={12}>
                        <p className='text-center crudTitle'>Create a new user</p>
                    </Col>
                </Row>

                <Row>
                    <Form noValidate onSubmit={(e) => handleSubmit(e)}>

                        <Row>
                            <Col md={12} lg={12} sm={12}>

                                <div className='userDataInputCntr'>
                                    <div className='userDataInputCol1'>
                                        <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                placeholder="First name"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                            {errors.name && <span className="error">{errors.name}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <Form.Control
                                                type="number"
                                                placeholder="Phone number"
                                                value={phoneNumber}
                                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                                            />
                                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <Form.Control
                                                type="email"
                                                placeholder="Mail address"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                            {errors.email && <span className="error">{errors.email}</span>}
                                        </div>


                                    </div>

                                    <div className='userDataInputCol2'>

                                        <div className="position-relative">
                                            <Form.Control
                                                type="date"
                                                placeholder="Date of birth"
                                                value={dob}
                                                onChange={handleAge}
                                            />
                                            {errors.dob && <span className="error">{errors.dob}</span>}

                                        </div>

                                        <div className="position-relative">
                                            <Form.Control
                                                disabled
                                                type="number"
                                                placeholder="Age calculated automatically"
                                                value={age}
                                            />
                                            {errors.dob && <span className="error">{errors.dob}</span>}

                                        </div>

                                        {/* <label className="form-label label-text">Gender :</label> */}

                                        <div className='segment-control'>
                                            <input type="radio" className="btn-check active" name="options-outlined" id="male-outlined" autoComplete="off" value="male" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn  segment-btn" htmlFor="male-outlined">Male</label>

                                            <input type="radio" className="btn-check" name="options-outlined" id="female-outlined" autoComplete="off" value="female" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn segment-btn" htmlFor="female-outlined">Female</label>

                                            <input type="radio" className="btn-check" name="options-outlined" id="others-outlined" autoComplete="off" value="other" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn  segment-btn" htmlFor="others-outlined">Others</label>

                                            {errors.gender && <span className="error genderErr">{errors.gender}</span>}

                                        </div>

                                    </div>

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={12} sm={12}>
                                <div className='userImgInputCntr text-center'>
                                    <div className='uploadCntr'>

                                        <div className={prevImage ? 'cursorUnset' : 'file-input'} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <VscCloudUpload className={prevImage ? 'd-none cursorUnset' : ''} />
                                            <p>{prevImage ? <span style={{ color: 'green' }}>upload success! </span> : 'Upload'}</p>
                                            {errors.image && <span className="error imgErr">{errors.image}</span>}

                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className='text-end'>
                            <Col md={12}>
                                <div className='userSubmitBtn'>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </Col>
                        </Row>

                    </Form>
                </Row>
            </Container >


            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {errorTxt}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Login Error Try Again Later</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </section >
    );
};

export default CreateComponent;
