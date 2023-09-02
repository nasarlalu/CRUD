import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { LiaUserEditSolid } from 'react-icons/lia'
import { useDropzone } from 'react-dropzone';
import { MdOutlineDelete } from 'react-icons/md'


const DeleteComponent = () => {

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


  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.log("No user selected for deletion");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/users/${userId}`);
      console.log('User Deleted:', response.data);
      // Assuming you also want to update the user list after deletion
      fetchUserList();
      setIsUpdateModal(false);
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
                {userData.length > 0 ? userData.map((user) => {
                  let dob = user.dob
                  let newDob = dob.split('T')[0]
                  return (
                    <>                    <tr key={user.email} className='dataTr'>
                      <td className='tdFirst'><img src={`http://localhost:3001/${user.image}`} alt='user image' className='imgBox' /> </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.gender}</td>
                      <td>{newDob}</td>
                      <td className='tdLast'>
                        <MdOutlineDelete className='editIcon' onClick={() => setIsUpdateModal(true)} />
                      </td>
                    </tr>

                      <Modal show={isUpdateModal} onHide={handleClose} className='updateModal DeleteModal'>
                        <Form noValidate>
                          <Modal.Header>
                            <Modal.Title></Modal.Title>
                            <img src='/images/closeBtn.png' alt='' className='closeBtn' onClick={handleClose} />
                          </Modal.Header>

                          <Modal.Body className='d-flex align-items-center'>
                            <p className='mb-0'>Are you sure want to delete ?</p>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button className='discardBtn' onClick={handleClose}>
                              No
                            </Button>
                            <Button className='updateBtn' onClick={() => handleDeleteUser(user._id)}>
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                    </>
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
