import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { MdOutlineDelete } from 'react-icons/md'


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

    try {
      const user = await axios.get('http://localhost:3001/api/users')
      console.log(user.data, 'userdata');
      setUserData(user.data)
      setIsUpdateModal(new Array(user.data.length).fill(false));
    }
    catch (err) {
      console.error(err, 'error fetching user list');
    }

  }


  const handleDeleteUser = async (userId) => {


    console.log(userId, 'deleteUseriD');

    if (!userId) {
      alert("No user selected for deletion");
      return;
    }

    try {
      const envApiLink = process.env.REACT_APP_DEV_API
      const response = await axios.delete(`${envApiLink}/${userId}`);
      console.log('User Deleted:', response.data);

      fetchUserList();
      handleClose(userId)
    } catch (error) {
      console.error('Error deleting user:', error);
      console.log('Request config:', error.config);
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
                {userData.length > 0 ? userData.map((user, index) => {
                  let dob = user.dob
                  let newDob = dob.split('T')[0]
                  return (
                    <React.Fragment key={user._id}>
                      <tr className='dataTr' >
                        <td className='tdFirst'><img src={`http://localhost:3001/${user.image}`} alt='user image' className='imgBox' /> </td>
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
      </Container>
    </section >
  );
};

export default DeleteComponent;
