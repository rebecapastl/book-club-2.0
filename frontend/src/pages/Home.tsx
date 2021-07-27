import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';

//create interface to establish the Book type format
interface Book {
    _id: string,
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
    ownerId: string,
};

//create interface to establish the User type format
interface Review {
    _id: string,
    text: string,
    user: string,
    book: string,
    userId: string,
    bookId: string,
}

function Home(props: { newBook: Book; newReview: Review }){

    const newBook = props.newBook;
    const newReview = props.newReview;

    return(
        <React.Fragment>
            <h2 className='montserrat-alternate text-yellow my-5 text-center'>Welcome to the Book Club</h2>
            
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
                        <Card.Img variant='top' src={newBook.cover} alt={newBook.title} />
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            <Card.Title className='montserrat-alternate'>{newBook.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} className="p-0 mx-auto">
                <Card className="text-yellow shadow rounded-0 border-0 m-3 p-2" bg='dark'>
                    <Card.Title className='montserrat-alternate text-center m-3'>{newReview.book}</Card.Title>
                    <Card.Body className='align-items-center justify-content-center'>
                        <Card.Text>
                            <div className="m-2">
                                <ImQuotesLeft 
                                    className='text-yellow' 
                                    role="button"  
                                    size={20} 
                                />  
                            </div>
                            <div className="m-2 text-center">
                            {newReview.text} 
                            </div>
                            <div className="m-2 text-end">
                                <ImQuotesRight 
                                    className='text-yellow' 
                                    role="button"  
                                    size={20} 
                                />
                            </div>
                        </Card.Text>
                        <Card.Footer className='text-yellow small text-end'>
                            {newReview.user}
                        </Card.Footer>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </React.Fragment>  
    );
}

export default Home;