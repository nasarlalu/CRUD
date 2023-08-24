import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
    return (
        <section className='RootPage'>
            <div className='curvedContainer purpleBg section-fit d-flex align-items-center'>
                <Container>
                    <Row className="align-items-center text-center">
                        <Col md={12}>
                            <div className="py-5">
                                <h1 className='app-title'>CRUD</h1>
                                <nav className='home-links-container'>
                                    <Link className='home-links' to='/signup'>Sign Up</Link> <span>or</span>
                                    <Link className='home-links' to='/login'>Log In</Link>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}

export default Home;