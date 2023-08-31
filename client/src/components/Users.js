import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {

    // const userList = useSelector((state) => state.users.value);

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
            console.log(response, 'users');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (

        <>

            <section className='purpleBg py-5'>
                <div className='container'>
                    <h1 className='text-center'> Users List</h1>
                    <div className='row align-items-center'>
                        {users?.map((user, i) => {
                            console.log(user._id, 'userid')
                            return (
                                <div className='col-md-4 py-5' key={i}>
                                    <Link to={`/edituser/${user._id}`} className=''>
                                        <div className="users-card-container text-start">
                                            <div className="user-img-container">
                                                <img className='users-img' height="150" width="150" src={`http://localhost:3001/${user.image}`} alt="User Image" />
                                            </div>
                                            <div className="user-text-container">
                                                <span className='mx-2'>Name:</span><p className='m-0'>{user.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}

                    </div>

                    <div className='row py-5'>
                        <div className='col-md-12 text-center'>
                            <Link to='/' className='go-back-link'>Go Back</Link>
                        </div>
                    </div >
                </div>
            </section>

        </>
    );
}

export default Users;