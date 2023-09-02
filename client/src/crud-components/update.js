import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { LiaUserEditSolid } from 'react-icons/lia'
import { useDropzone } from 'react-dropzone';
import { VscCloudUpload } from 'react-icons/vsc'


const UpdateComponent = () => {
    // const [users, setUsers] = useState([]);
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [age, setAge] = useState('');
    // const [selectedUserId, setSelectedUserId] = useState('');
    // const [selectedUserData, setSelectedUserData] = useState([]);
    // const [errors, setErrors] = useState({});

    // const handleUpdateUser = async () => {

    //     try {
    //         const response = await axios.put(`http://localhost:3001/api/users/${selectedUserId}`, {
    //             name,
    //             email,
    //             age
    //         });

    //         console.log('User updated:', response.data);
    //         fetchUsers();
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //     }
    // };



    const [userData, setUserData] = useState([])
    const [userDob, setUserDob] = useState([])
    const [isUpdateModal, setIsUpdateModal] = useState(false)
    const [gender, setGender] = useState('')
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null)



    const handleClose = () => setIsUpdateModal(false);
    const handleShow = () => setIsUpdateModal(true);

    const fetchUserList = async () => {

        try {
            const user = await axios.get('http://localhost:3001/api/users')
            console.log(user.data, 'userdata');
            setUserData(user.data)
        }
        catch (err) {
            console.error(err, 'error fetching user list');
        }

    }

    const handleUpdateUser = () => {
        console.log('handleUpdateUser');
    }

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
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);

            const reader = new FileReader();
            reader.onload = () => {
                // setPrevImage(reader.result);
            };
            reader.readAsDataURL(acceptedFiles[0]);
        }
    };

    useEffect(() => {
        fetchUserList()
    }, [])

    return (
        <section className='updateCrudSection tableSection'>
            <Container>
                <Row>
                    <Col lg={12} md={12}>

                        <table className='table2'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>Gender</th>
                                    <th>Dob</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userData.length > 0 ? userData.map((user) => {
                                    let dob = user.dob
                                    let newDob = dob.split('T')[0]
                                    return (
                                        <tr key={user.email} className='dataTr'>
                                            <td className='tdFirst'><img src={`http://localhost:3001/${user.image}`} alt='user image' className='imgBox' /> </td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.gender}</td>
                                            <td>{newDob}</td>
                                            <td className='tdLast'>
                                                <LiaUserEditSolid className='editIcon' onClick={() => setIsUpdateModal(true)} />
                                            </td>
                                        </tr>
                                    )
                                }) :
                                    <tr className='dataTr'>
                                        <td>Error</td>
                                        <td>Error</td>
                                        <td>Error</td>
                                        <td>Error</td>
                                        <td>Error</td>
                                        <td>Error</td>
                                    </tr>
                                }

                            </tbody>
                        </table>

                    </Col>
                </Row>
            </Container>

            <Modal show={isUpdateModal} onHide={handleClose} className='updateModal'>
                <Form noValidate>

                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                        <img src='/images/closeBtn.png' alt='' className='closeBtn' onClick={handleClose} />
                    </Modal.Header>

                    <Modal.Body>

                        <Row>
                            <Col md={12} lg={12}>

                                <div className='userDataInputCntr'>
                                    <div className='userDataInputCol1'>
                                        <Form.Control
                                            type="text"
                                            placeholder="First name"
                                        />

                                        <Form.Control
                                            type="number"
                                            placeholder="Phone number"
                                        />

                                        <Form.Control
                                            type="email"
                                            placeholder="Mail address"
                                        />
                                    </div>

                                    <div className='userDataInputCol2'>

                                        <Form.Control
                                            type="date"
                                            placeholder="Date of birth"
                                        />

                                        <Form.Control
                                            disabled
                                            type="number"
                                            placeholder="Age calculated automatically"
                                        />

                                        {/* <label className="form-label label-text">Gender :</label> */}

                                        <div className='segment-control'>
                                            <input type="radio" className="btn-check active" name="options-outlined" autoComplete="off" value="male" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn  segment-btn" htmlFor="male-outlined">Male</label>

                                            <input type="radio" className="btn-check" name="options-outlined" autoComplete="off" value="female" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn segment-btn" htmlFor="female-outlined">Female</label>

                                            <input type="radio" className="btn-check" name="options-outlined" autoComplete="off" value="other" onChange={(e) => { setGender(e.target.value) }} />
                                            <label className="btn  segment-btn" htmlFor="others-outlined">Others</label>
                                        </div>

                                        {errors.gender && <span className="error">{errors.gender}</span>}

                                    </div>

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={12}>
                                <div className='userImgInputCntr text-center'>
                                    <div className='uploadCntr'>

                                        <div className="file-input" {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <VscCloudUpload />
                                            <p>Upload</p>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='discardBtn' onClick={handleClose}>
                            Discard
                        </Button>
                        <Button className='updateBtn' onClick={handleUpdateUser}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </section >
    );
};

export default UpdateComponent;
