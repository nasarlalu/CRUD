import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

    const userList = useSelector((state) => state.users.value);

    return (

        <>

            <section className='section-bg py-5'>
                <div className='container'>
                    <h1 className='text-center'> Users List</h1>
                    <div className='row align-items-center'>
                        {userList?.map((user, i) => {
                            return (
                                <div className='col-md-4 py-5' key={i}>
                                    <Link to='/editusers' className=''>
                                        <div className="users-card-container text-start">
                                            <div className="user-img-container">
                                                <img className='users-img' height="150" width="150" src={user.image} alt="User Image" />
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