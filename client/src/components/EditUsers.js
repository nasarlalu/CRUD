import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, updateUser } from '../redux/reducers'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';



const EditUsers = () => {

    // const userList = useSelector((state) => state.users.value);
    // const dispatch = useDispatch();

    const { userId } = useParams();

    console.log(userId, 'userId from Edituser');

    const [person, setPerson] = useState({
        name: '',
        number: '',
        email: '',
    })


    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAge, setNewAge] = useState('')
    const [newDob, setNewDob] = useState('')
    const [newGender, setNewGender] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [user, setUsers] = useState([])
    const [is404Err, set404Err] = useState('')


    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
            setUsers(response.data);
            console.log(response.data, 'fetching users data');
        } catch (error) {
            console.error('Error fetching users:', error);
            console.log(error.response.status, 'ss')
            set404Err(error.response.status)
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleImageDrop,
        accept: 'image/*',
        multiple: false,
    });

    function handleImageDrop(acceptedFiles) {
        console.log(acceptedFiles, 'handleImageDrop');
        if (acceptedFiles.length > 0) {
            setNewImage(acceptedFiles[0]);
            console.log('newImageState', newImage);
        }
    };


    const handleUpdateUser = async (userId, currentUserData) => {

        try {

            console.log(currentUserData, 'currentUserData');

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
                console.log(currentUserData.image, 'currImg');
            }

            console.log(formData, 'formDataBeforeSendng');

            // Send a PUT request to update the user data
            const response = await axios.put(`http://localhost:3001/api/users/${userId}`, formData);

            console.log('User updated:', response.data);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };



    const handleDeleteUser = async (userId) => {
        if (!userId) {
            console.log("No user selected for deletion");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3001/api/users/${userId}`);
            console.log('User Deleted:', response.data);
            // Assuming you also want to update the user list after deletion
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            console.log('Request config:', error.config);
        }
    };


    useEffect(() => {
        fetchUsers()
    }, [])

    return (

        <>

            <section className='edituser-section py-5'>
                <div className='container'>
                    <h1 className='text-center'>{is404Err == '404' ? 'User Not Found' : 'Edit User Details'}</h1>
                    <div className={is404Err == '404' ? 'd-none' : 'row align-items-center'}>

                        <div className='col-md-5 py-5'>
                            <div className="edit-users-card-container text-start">
                                <div className="edit-user-text-container">
                                    <table className="table table-borderless edit-table">
                                        <tbody>

                                            <tr>
                                                <th scope="row"><h3>OLD DATA</h3></th>
                                                <th scope="row"><h3>NEW DATA</h3></th>

                                            </tr>

                                            <tr>
                                                <th scope="row">User Id:</th>
                                                <td>****</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Name</th>
                                                <td>
                                                    <input className="form-control" type='text' placeholder={user.name} onChange={(e) => { setNewName(e.target.value) }} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Number</th>
                                                <td>
                                                    <input className="form-control" type='number' placeholder={user.phoneNumber} onChange={(e) => { setNewNumber(e.target.value) }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email</th>
                                                <td>
                                                    <input className="form-control" type='email' placeholder={user.email} onChange={(e) => { setNewEmail(e.target.value) }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Dob</th>
                                                <td>
                                                    <input className="form-control" type='date' placeholder={user.dob} onChange={(e) => { setNewDob(e.target.value) }} />
                                                </td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Age</th>
                                                <td>
                                                    <input className="form-control" type='number' placeholder={user.age} onChange={(e) => { setNewAge(e.target.value) }} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Gender</th>

                                                <td>
                                                    <input className="form-control" type='text' placeholder={user.gender} onChange={(e) => { setNewGender(e.target.value) }} />
                                                </td>

                                            </tr>

                                            <tr>
                                                <th scope="row">
                                                    <img className='users-img' height="150" width="150" src={`http://localhost:3001/${user.image}`} alt="User Image" />
                                                </th>

                                                <td>

                                                    <div className="file-input" {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '20px' }}>
                                                            <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" ></path>
                                                        </svg>
                                                    </div>


                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="user-edit-btn">
                                    <button onClick={() => handleDeleteUser(user._id)}>Delete UserName</button>
                                    <button onClick={() => handleUpdateUser(user._id, user)} className='mx-4'>Update UserName</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='row pt-5 pb-2'>
                        <div className='col-md-12 text-center'>
                            <Link to='/' className='go-back-link'>Go Back</Link>
                        </div>
                    </div >
                </div>
            </section>

        </>
    );
}

export default EditUsers;


