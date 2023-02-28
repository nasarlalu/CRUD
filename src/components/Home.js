import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <section className='section-bg section-fit d-flex align-items-center'>
            <div className="container">
                <div className="row align-items-center text-center">
                    <div className='col-md-12 col-lg-12 col-xs-12'>
                        <div className="py-5">
                            <h1 className='app-title'>CRUD</h1>

                            <nav className='home-links-container'>
                                <Link className='home-links' to='/signup'>Sign Up</Link> <a>or</a>
                                <Link className='home-links' to='/login'>Admin Log In</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;