import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Card from 'react-bootstrap/Card';

export default function ReadComponent() {

  const [userData, setUserData] = useState([])

  const fetchUserList = async () => {

    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API;


    try {
      const user = await axios.get(apiUrl)
      setUserData(user.data)
    }
    catch (err) {
      console.error(err, 'error fetching user list');
    }

  }

  useEffect(() => {
    fetchUserList()
  }, [])

  const rootApiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_ROOT_API : process.env.REACT_APP_PROD_ROOT_API;


  return (
    <section className='readCrudSection tableSection'>
      <Container>

        <Row className='mobOnly'>
          <Col sm={12}>
            <p className='text-center crudTitle'>Reading The entire user list</p>
          </Col>
        </Row>

        <Row className='deskOnly'>
          <Col lg={12} md={12}>
            <table className='table2'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Gender</th>
                  <th>Dob</th>
                </tr>
              </thead>

              <tbody>
                {userData.length > 0 ? userData.map((user, index) => {
                  let dob = user.dob
                  let newDob = dob.split('T')[0]

                  let apiURL = `${rootApiUrl}${user.image}`
                  let userImgUrl = apiURL.replace(/\\/g, '/')

                  console.log(userImgUrl, 'userImgUrl');

                  return (
                    <tr key={user.email} className='dataTr'>
                      <td className='tdFirst'>
                        <img src={`${userImgUrl}`} alt='user image' className='imgBox' />
                      </td>
                      <td className='tdSecond'>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.gender}</td>
                      <td className='tdLast'>{newDob}</td>
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
                      <Card.Text>{user.age}</Card.Text>
                      <Card.Text>{newDob}</Card.Text>
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
    </section>
  )
}





