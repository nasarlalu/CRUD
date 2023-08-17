import { Link } from 'react-router-dom'
const AccountCreated = () => {
    return (
        <>
            <section className='section-bg section-fit d-flex align-items-center account-created-section'>
                <div className="container">
                    <div className="row text-center">

                        <div className="col-md-12 my-4">
                            <h1>Your Account Has Been SuccessFully Created</h1>
                        </div>

                        <div className='col-md-12 my-4'>
                            <Link to='/users'>
                                <div className='check-all-user-text'>
                                    <h1>click here to check All Users</h1>
                                </div>
                            </Link>
                        </div>

                        <div className='col-md-12 my-5'>
                            <Link to='/'>Go back To Home page</Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default AccountCreated;