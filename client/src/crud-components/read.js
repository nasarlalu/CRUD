import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function ReadComponent() {

  const [userData, setUserData] = useState([])
  const [userDob, setUserDob] = useState([])

  const fetchUserList = async () => {

    try {

      const user = await axios.get(process.env.REACT_APP_DEV_API)
      console.log(user.data, 'userdata');
      setUserData(user.data)
    }
    catch (err) {
      console.error(err, 'error fetching user list');
    }

  }

  useEffect(() => {
    fetchUserList()
  }, [])


  return (
    <section className='readCrudSection tableSection'>
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
                </tr>
              </thead>

              <tbody>
                {userData.length > 0 ? userData.map((user) => {
                  let dob = user.dob
                  let newDob = dob.split('T')[0]
                  return (
                    <tr key={user.email} className='dataTr'>
                      <td className='tdFirst'><img src={`http://localhost:3001/${user.image}`} alt='user image' className='imgBox' /> </td>
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
      </Container>
    </section>
  )
}





