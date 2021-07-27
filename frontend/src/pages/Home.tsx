import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//create interface to establish the Book type format
interface Book {
    _id: string,
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
};

//create interface to establish the User type format
interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
};

function Home(props: { allUsers: User[]; allBooks: Book[] }){
    return(
        <React.Fragment>
            <h2 className='montserrat-alternate text-yellow my-5 text-center'>Welcome to the Book Club</h2>
            <div className="text-center">
                <NavLink className='hover-effect text-yellow text-decoration-none' to='/signup'>
                    <Button variant="warning" className="hover-effect mx-4">Sign Up</Button>
                </NavLink> 
                <NavLink className='hover-effect text-yellow text-decoration-none' to='/login'>
                    <Button variant="outline-warning" className="hover-effect mx-4">Login</Button>
                </NavLink>
            </div>
            
            <Row className='mt-5'>
                <Col className="text-center" sm={6}>
                    <h2 className='montserrat-alternate text-yellow'>Newly added book</h2>
                </Col>
                <Col className="text-center" sm={6}>
                    <h2 className='montserrat-alternate text-yellow'>Most recent review</h2>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center" sm={6}>
                    
                    <Card className="text-yellow hover-effect shadow rounded-0 border-0 m-5" bg='dark' style={{ width: '18rem' }}>
                        <Card.Img variant='top' src='/images/silma.jpg' alt='silma' />
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            <Card.Title className='montserrat-alternate'>Book Title</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="d-flex justify-content-center" sm={6}>
                        <Card className="text-yellow hover-effect shadow rounded-0 border-0 m-5" bg='dark' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title className='montserrat-alternate text-center'>Book Title</Card.Title>
                                <Card.Text>
                                    "Text of review lalalala la a ala ala alalala alalalala alala alala lalla alal"
                                    <p className='small my-0 text-end'>
                                        User
                                    </p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Img variant='bottom' src='/images/silma.jpg' alt='silma' />
                        </Card>
                    </Col>
            </Row>
            
        </React.Fragment>  
    );
}

export default Home;