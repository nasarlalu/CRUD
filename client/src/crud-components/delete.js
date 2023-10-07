import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { MdOutlineDelete } from 'react-icons/md'
import Card from 'react-bootstrap/Card';

const DeleteComponent = () => {

  const [userData, setUserData] = useState([])
  const [isUpdateModal, setIsUpdateModal] = useState([])

  const handleClose = (userId) => {
    // setIsUpdateModal(false)

    setIsUpdateModal((prev) => {
      const updatedState = [...prev];
      updatedState[userId] = false;
      return updatedState;
    });

  }

  const fetchUserList = async () => {

    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API;


    try {
      const user = await axios.get(apiUrl)
      setUserData(user.data)
      setIsUpdateModal(new Array(user.data.length).fill(false));
    }
    catch (err) {
      console.error(err, 'error fetching user list');
    }

  }


  const handleDeleteUser = async (userId) => {



    if (!userId) {
      alert("No user selected for deletion");
      return;
    }

    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API;

    try {
      const envApiLink = apiUrl
      const response = await axios.delete(`${envApiLink}/${userId}`);
      alert('User Deleted Successfully', response.data);

      fetchUserList();
      handleClose(userId)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUserList()
  }, [])

  // const rootApiUrl = process.env.REACT_APP_ROOT_API
  const rootApiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_ROOT_API : process.env.REACT_APP_PROD_ROOT_API;


  return (
    <section className='updateCrudSection tableSection'>
      <Container>

        <Row className='mobOnly'>
          <Col sm={12}>
            <p className='text-center crudTitle'>Delete users</p>
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
                {userData.length > 0 ? userData.map((user, index) => {
                  let dob = user.dob
                  let newDob = dob.split('T')[0]
                  return (
                    <React.Fragment key={user._id}>
                      <tr className='dataTr' >
                        <td className='tdFirst'><img src={`${rootApiUrl}${user.image}`} alt='user image' className='imgBox' /> </td>
                        <td className='tdSecond'>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.gender}</td>
                        <td>{newDob}</td>
                        <td className='tdLast'>
                          <MdOutlineDelete className='editIcon' onClick={() => setIsUpdateModal((prev) => prev.map((value, i) => (i === index ? true : value)))} />
                        </td>
                      </tr>

                      <Modal show={isUpdateModal[index]} onHide={() => handleClose(index)} className='updateModal DeleteModal'>
                        <Form noValidate>
                          <Modal.Header>
                            <Modal.Title></Modal.Title>
                            <img src='/images/closeBtn.png' alt='' className='closeBtn' onClick={() => handleClose(index)} />
                          </Modal.Header>

                          <Modal.Body className='d-flex align-items-center'>
                            <p className='mb-0'>Are you sure want to delete ?</p>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button className='discardBtn' onClick={() => handleClose(index)}>
                              No
                            </Button>
                            <Button className='updateBtn' onClick={() => handleDeleteUser(user._id)}>
                              Yes
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

            {userData.length > 0 ? userData.map((user, index) => {
              let dob = user.dob
              let newDob = dob.split('T')[0]

              let apiURL = `${rootApiUrl}${user.image}`
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
                      <Button onClick={() => setIsUpdateModal((prev) => prev.map((value, i) => (i === index ? true : value)))}>Delete the user</Button>
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

export default DeleteComponent;
