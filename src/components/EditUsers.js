import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, updateUser } from '../redux/reducers'
import React, { useState, useEffect } from 'react';


const EditUsers = () => {

    const userList = useSelector((state) => state.users.value);
    const dispatch = useDispatch();

    // const DeleteUser = () => {
    //     dispatch(deleteUser({ id: user.id }))
    // }
    // const UpdateNewUser = () => {
    //     dispatch(updateUser({ id: user.id, name: newName, number: newNumber, email: newEmail, dob: newDob, age: newAge, gender: newGender, image: newImage }))
    // }

    // const handleNewImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setNewImage(URL.createObjectURL(e.target.files[0]));
    //     }
    // }


    useEffect(() => {
        userList?.map((user) => {
            let initialname = user.name
            console.log(initialname);
        })
    }, [])


    const [person,setPerson] = useState({
        name: '',
        number: '',
        email: '',
    })


    const [newName,  setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAge, setNewAge] = useState('')
    const [newDob, setNewDob] = useState('')
    const [newGender, setNewGender] = useState('')
    const [newImage, setNewImage] = useState(null)

    return (

        <>

            <section className='edituser-section py-5'>
                <div className='container'>
                    <h1 className='text-center'> Edit User Details</h1>
                    <div className='row align-items-center'>
                        {userList?.map((user, i) => {

                            const DeleteUser = () => {
                                dispatch(deleteUser({ id: user.id }))
                            }

                            const UpdateNewUser = () => {
                                // if (newName.length == 0) {
                                //     alert('enter your name')
                                // }
                                // else if (newNumber.length == 0) {
                                //     alert('enter your number')
                                // }
                                // else if (newEmail.length == 0) {
                                //     alert('enter your email')
                                // }
                                // else if (newDob.length == 0) {
                                //     alert('enter your dob')
                                // }
                                // else if (newAge.length == 0) {
                                //     alert('enter your age')
                                // }
                                // else if (newGender.length == 0) {
                                //     alert('enter your gender')
                                // }
                                // else if (newImage.length == 0) {
                                //     alert('Upload New Image')
                                // }


                                dispatch(updateUser({ id: user.id, name: newName, number: newNumber, email: newEmail, dob: newDob, age: newAge, gender: newGender, image: newImage }))

                            }

                            return (
                                <div className='col-md-5 py-5' key={i}>
                                    <div className="edit-users-card-container text-start">
                                        {/* <div className="user-img-container">
                                            <img className='users-img' height="150" width="150" src={user.image} alt="User Image" />
                                        </div> */}
                                        <div className="edit-user-text-container">
                                            <table className="table table-borderless edit-table">
                                                <tbody>

                                                    <tr>
                                                        <th scope="row"><h3>OLD DATA</h3></th>
                                                        <th scope="row"><h3>NEW DATA</h3></th>

                                                    </tr>

                                                    <tr>
                                                        <th scope="row">User Id:</th>
                                                        <td>{user.id}</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">{user.name}</th>
                                                        <td>
                                                            <input className="form-control" type='text' placeholder={user.name} onChange={(e) => { setNewName(e.target.value) }} />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">{user.number}</th>
                                                        <td>
                                                            <input className="form-control" type='number' placeholder={user.number} onChange={(e) => { setNewNumber(e.target.value) }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">{user.email}</th>
                                                        <td>
                                                            <input className="form-control" type='email' placeholder={user.email} onChange={(e) => { setNewEmail(e.target.value) }} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">{user.dob}</th>
                                                        <td>
                                                            <input className="form-control" type='date' placeholder={user.dob} onChange={(e) => { setNewDob(e.target.value) }} />
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th scope="row">{user.age}</th>
                                                        <td>
                                                            <input className="form-control" type='number' placeholder={user.age} onChange={(e) => { setNewAge(e.target.value) }} />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">{user.gender}</th>

                                                        <td>
                                                            <input className="form-control" type='text' placeholder={user.gender} onChange={(e) => { setNewGender(e.target.value) }} />
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <th scope="row">
                                                            <img className='users-img' height="150" width="150" src={user.image} alt="User Image" />
                                                        </th>

                                                        <td>
                                                            <div className="file-input upload-icon-padng">
                                                                <input type="file" name="file-input" id="file-input" className=" form-control file-input__input" accept="image/*" onChange={(e) => {
                                                                    if (e.target.files && e.target.files[0]) {
                                                                        setNewImage(URL.createObjectURL(e.target.files[0]));
                                                                    }
                                                                }} />
                                                                <label className="file-input__label" htmlFor="file-input">
                                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
                                                                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" ></path>
                                                                    </svg>
                                                                    <a>Update The Image</a>
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="user-edit-btn">
                                            <button onClick={DeleteUser}>Delete UserName</button>
                                            <button onClick={UpdateNewUser} className='mx-4'>Update UserName</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

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