import React, {MouseEvent, useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AddReview from '../components/AddReview';

import { Paginated } from '@feathersjs/feathers';
import client from '../feathers';

// create service
const reviewsService = client.service('reviews');
const booksService = client.service('books');


//create interface to establish the Review type format
interface Review {
    _id: string,
    text: string,
    user: string,
    book: string,
    userId: string,
    bookId: string,
};

//create interface to establish the props type format
interface DetailsProps {
    location: {
        state: {
            id: string,
            title: string,
            author: string,
            cover: string,
            availability: string,
            owner: string,
            ownerId: string,
        }
    }
}

//cannot be rendered by itslf, it needs to be called from Books (NavLink props)
function BookDetails(props:DetailsProps){

    const [showBookAlert, setShowBookAlert] = useState(false);
    const [showReviewAlert, setShowReviewAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [bookId, setBookId] = useState(props.location.state.id);
    const [bookTitle, setBookTitle] = useState(props.location.state.title);
    const [bookAuthor, setBookAuthor] = useState(props.location.state.author);
    const [bookCover, setBookCover] = useState(props.location.state.cover);
    const [bookAvailability, setBookAvailability] = useState(props.location.state.availability);
    const [bookOwner, setBookOwner] = useState(props.location.state.owner);
    const [bookOwnerId, setBookOwnerId] = useState(props.location.state.ownerId);
    const [allReviews, setAllReviews] = useState<Array<Review>>([]);
    const [userOwnsBook, setUserOwnsBook] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    const handleCloseBookAlert = () => setShowBookAlert(false);
    const handleShowBookAlert = () => setShowBookAlert(true);
    const handleCloseReviewAlert = () => setShowReviewAlert(false);
    const handleShowReviewAlert = () => setShowReviewAlert(true);

    client.get('authentication')
    .then((result: any) => { 
        setCurrentUser(result.user._id);
        if (currentUser === props.location.state.ownerId) setUserOwnsBook(true)
    });

    //populate allReviews
    useEffect(() => {
        reviewsService
        .find({query:{bookId: bookId,}})
        .then( (reviewPage: Paginated<Review>) => {
            setAllReviews( reviewPage.data );
        })
        .catch( (err: any) => {
            console.log( "problem finding reviews.");
            console.log(err);
        });

        // Add new review to the review list
        reviewsService.on('created', (review: any) =>
            setAllReviews(currentReviews => currentReviews.concat(review))
        );

        // Remove deleted review from the review list
        reviewsService.on('removed', () => {
            reviewsService
            .find({query:{bookId: bookId,}})
            .then( (reviewPage: Paginated<Review>) => {
                setAllReviews( reviewPage.data );
            })
            .catch( (err: any) => {
                console.log( "problem finding reviews.");
                console.log(err);
            });
        });
    }, []);

    const handleDeleteBook = (id: string) => {
       console.log('delete book')
        // booksService
        // .remove(id)
        // .catch( (err: any) => {
        //     // Error: Cannot read property 'ownerId' of undefined
        //     console.log( "problem deleting book.");
        //     console.log(err);
        // });
        handleCloseBookAlert();
    }

    const handleDeleteReview = (id: string) => {
        reviewsService
        .remove(id)
        .catch( (err: any) => {
            console.log( "problem deleting review.");
            console.log(err);
        });
        handleCloseReviewAlert();
        
    }

    if (redirect) {
        return <Redirect to='/books' />
    }

    //all reviews for one book
    const reviewCols = allReviews.map((review: Review, index: number) => 
        <Col key={index}>
            <Card className="text-yellow shadow rounded-0 border-0 m-3 p-2" bg='dark'>

                {/* review info */}
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
                            {review.text} 
                        </div>
                        <div className="m-2 text-end">
                            <ImQuotesRight 
                                className='text-yellow' 
                                role="button"  
                                size={20} 
                            />
                        </div>
                    </Card.Text>
                    <Card.Footer className='text-yellow small'>
                    
                    {/* delete review */}
                    <Row>

                    
                    {currentUser === review.userId &&
                        <Col>
                            <FaTrashAlt className='text-yellow hover-effect m-2' onClick={handleShowReviewAlert}/>
                        </Col>
                    }
                        <Modal
                            show={showReviewAlert}
                            onHide={handleCloseReviewAlert}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header>
                                <Modal.Title>Delete review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                This action cannot be undone.
                                Do you want do delete this review?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseReviewAlert}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteReview(review._id)}>
                                    Delete review
                                </Button>
                            </Modal.Footer>
                        </Modal>    
                        <Col>
                            <p className='text-end'>{review.user}</p>
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );

    return(
        <React.Fragment>
            <NavLink className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' to='/books'>
                <RiArrowGoBackFill 
                    className='text-yellow hover-effect d-md-inline-block' 
                    role="button"  
                    size={20} 
                /> Back to Books
            </NavLink>
            
            <h2 className='montserrat-alternate text-yellow text-center mt-5'>{bookTitle}</h2> 

            
            <Row className='m-5 justify-content-center'>
                {/* book image */}
                <Col md={6} className="text-center text-lg-end">
                    <Image src={bookCover} alt={bookTitle} width={250}></Image>
                </Col>

                {/* book info */}
                <Col md={6} className="mt-5 mt-md-0 px-5 text-lg-start">
                    <p className='text-yellow'>Title: {bookTitle}</p>
                    <p className='text-yellow'>Author: {bookAuthor}</p>
                    <p className='text-yellow'>Availability: {bookAvailability}</p>
                    <p className='text-yellow'>Owner: {bookOwner}</p>
                    {currentUser === bookOwnerId &&
                        <div>
                            <Button variant="outline-warning" onClick={handleShowBookAlert}>Delete Book</Button>
                        </div>
                    }
                    <Modal
                        show={showBookAlert}
                        onHide={handleCloseBookAlert}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Delete book</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            This action cannot be undone.
                            Do you want do delete {bookTitle}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseBookAlert}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteBook(bookId)}>
                                Delete book
                            </Button>
                        </Modal.Footer>
                    </Modal>                   
                </Col>
            </Row>
            
            {/* reviews */}
            <Row className="shadow p-5">
                <Col lg={6} className="p-0 mx-auto">
                    <AddReview book={bookTitle} bookId={bookId}/>
                    <h3 className='text-yellow'>Reviews</h3>
                    {reviewCols}
                </Col>
            </Row>
            
        </React.Fragment>  
    );
}

export default BookDetails;