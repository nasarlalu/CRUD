import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { LiaUserEditSolid } from 'react-icons/lia'
import { useDropzone } from 'react-dropzone';
import { VscCloudUpload } from 'react-icons/vsc'
import Card from 'react-bootstrap/Card';



const UpdateComponent = () => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAge, setNewAge] = useState('')
    const [newDob, setNewDob] = useState('')
    const [newGender, setNewGender] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [users, setUsers] = useState([])
    const [is404Err, set404Err] = useState('')
    const [isUpdateModal, setIsUpdateModal] = useState([])

    const handleClose = (userId) => {
        setIsUpdateModal((prev) => {
            const updatedState = [...prev];
            updatedState[userId] = false;
            return updatedState;
        })
    }


    const fetchUserList = async () => {

        try {
            const user = await axios.get(process.env.REACT_APP_DEV_API)
            setUsers(user.data)
            setIsUpdateModal(new Array(user.data.length).fill(false));
        }
        catch (err) {
            console.error(err, 'error fetching user list');
        }

    }

    const handleUpdateUser = async (userId, currentUserData) => {

        try {

            const formData = new FormData();
            formData.append('name', newName || currentUserData.name);
            formData.append('email', newEmail || currentUserData.email);
            formData.append('age', newAge || currentUserData.age);
            formData.append('dob', newDob || currentUserData.dob);
            formData.append('phoneNumber', newNumber || currentUserData.phoneNumber);
            formData.append('gender', newGender || currentUserData.gender);

            if (newImage) {
                formData.append('image', newImage);
            }
            else {
                formData.append('image', currentUserData.image);
            }


            // Send a PUT request to update the user data
            const envApiLink = process.env.REACT_APP_DEV_API
            const response = await axios.put(`${envApiLink}/${userId}`, formData);

            fetchUserList();
            handleClose(userId)
            alert('updated successfully')

        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


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
            setNewImage(acceptedFiles[0]);

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

    const apiUrlFromEnv = process.env.REACT_APP_ROOT_API


    return (
        <section className='updateCrudSection tableSection'>
            <Container>

                <Row className='mobOnly'>
                    <Col sm={12}>
                        <p className='text-center crudTitle'>Update user data</p>
                    </Col>
                </Row>

                <Row className='deskOnly'>
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
                                {users.length > 0 ? users.map((user, index) => {
                                    let dob = user.dob
                                    let newDob = dob.split('T')[0]
                                    return (
                                        <React.Fragment key={user.email} >
                                            <tr className='dataTr'>
                                                <td className='tdFirst'><img src={`${apiUrlFromEnv}${user.image}`} alt='user image' className='imgBox' /> </td>
                                                <td className='tdSecond'>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{user.gender}</td>
                                                <td>{newDob}</td>
                                                <td className='tdLast'>
                                                    <LiaUserEditSolid className='editIcon' onClick={() => setIsUpdateModal((prev) => prev.map((value, i) => (i === index ? true : value)))} />
                                                </td>
                                            </tr>

                                            <Modal show={isUpdateModal[index]} onHide={() => handleClose(index)} className='updateModal'>
                                                <Form noValidate>

                                                    <Modal.Header>
                                                        <Modal.Title></Modal.Title>
                                                        <img src='/images/closeBtn.png' alt='' className='closeBtn' onClick={() => handleClose(index)} />
                                                    </Modal.Header>

                                                    <Modal.Body>

                                                        <Row>
                                                            <Col md={12} lg={12}>

                                                                <div className='userDataInputCntr'>
                                                                    <div className='userDataInputCol1'>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder={user.name}
                                                                            onChange={(e) => { setNewName(e.target.value) }}
                                                                        />

                                                                        <Form.Control
                                                                            type="number"
                                                                            placeholder={user.phoneNumber}
                                                                            onChange={(e) => { setNewNumber(e.target.value) }}
                                                                        />

                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder={user.email}
                                                                            onChange={(e) => { setNewEmail(e.target.value) }}
                                                                        />
                                                                    </div>

                                                                    <div className='userDataInputCol2'>

                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder={newDob}
                                                                            onChange={(e) => { setNewDob(e.target.value) }}
                                                                        />

                                                                        <Form.Control
                                                                            min={1}
                                                                            max={2}
                                                                            type="number"
                                                                            placeholder={user.age}
                                                                        />

                                                                        <div className='segment-control'>
                                                                            <input type="radio" className="btn-check active" name="options-outlined" id="male-outlined" autoComplete="off" value="male" onChange={(e) => { setNewGender(e.target.value) }} />
                                                                            <label className="btn  segment-btn" htmlFor="male-outlined">Male</label>

                                                                            <input type="radio" className="btn-check" name="options-outlined" id="female-outlined" autoComplete="off" value="female" onChange={(e) => { setNewGender(e.target.value) }} />
                                                                            <label className="btn segment-btn" htmlFor="female-outlined">Female</label>

                                                                            <input type="radio" className="btn-check" name="options-outlined" id="others-outlined" autoComplete="off" value="other" onChange={(e) => { setNewGender(e.target.value) }} />
                                                                            <label className="btn  segment-btn" htmlFor="others-outlined">Others</label>

                                                                        </div>


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
                                                                            <p>Click here to upload new image</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button className='discardBtn' onClick={() => handleClose(index)}>
                                                            Discard
                                                        </Button>
                                                        <Button className='updateBtn' onClick={() => handleUpdateUser(user._id, user)}>
                                                            Update
                                                        </Button>
                                                    </Modal.Footer>
                                                </Form>

                                            </Modal>
                                        </React.Fragment>
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

                <Row className='mobOnly'>
                    <Col sm={12}>

                        {users.length > 0 ? users.map((user, index) => {
                            let dob = user.dob
                            let newDob = dob.split('T')[0]

                            let apiURL = `${apiUrlFromEnv}${user.image}`
                            let userImgUrl = apiURL.replace(/\\/g, '/')

                            return (
                                <Card className='userCard' key={user._id}>
                                    <Card.Body className='userCardBody'>

                                        <div className='idCntr'>
                                            {index + 1}
                                        </div>

                                        <div className='dataCntr'>
                                            <Card.Title>{user.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                            <Card.Text>{user.phoneNumber}</Card.Text>
                                            <Card.Text>{user.gender}</Card.Text>
                                            <Card.Text>{newDob}</Card.Text>
                                            <Button onClick={() => setIsUpdateModal((prev) => prev.map((value, i) => (i === index ? true : value)))}>Update Details</Button>
                                        </div>

                                        <div className='userImgCntr'>
                                            <img src={userImgUrl} alt='userImage' />
                                        </div>

                                    </Card.Body>
                                </Card>
                            )
                        })

                            :
                            <Card>
                                <Card.Body>
                                    <Card.Title>Error Getting User Deatils</Card.Title>
                                    <Card.Link href="/">Go Back</Card.Link>
                                </Card.Body>
                            </Card>
                        }
                    </Col>

                </Row>
            </Container>
        </section >
    );
};

export default UpdateComponent;
