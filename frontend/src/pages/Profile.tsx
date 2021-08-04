import React, {useState, useEffect} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';

import { Paginated } from '@feathersjs/feathers';
import client from '../feathers';

// analytics
import ReactGA from 'react-ga';

// create service
const usersService = client.service('users');
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

//create interface to establish the props type format
interface userDetails {
    location: {
        state: {
            id: string,
            email: string,
            name: string,
            avatar: string,
        }
    }
}

function Profile(props:userDetails){

    const userId = props.location.state.id;
    const userName = props.location.state.name;
    const userEmail = props.location.state.email;
    const userAvatar = props.location.state.avatar;

    const [allReviews, setAllReviews] = useState<Array<Review>>([]);
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);

    const [showAccountAlert, setShowAccountAlert] = useState(false);
    const [showBookAlert, setShowBookAlert] = useState(false);
    const [bookToDeleteId, setBookToDeleteId] = useState("");
    const [showReviewAlert, setShowReviewAlert] = useState(false);
    const [reviewToDeleteId, setReviewToDeleteId] = useState("");
    const [redirect, setRedirect] = useState(false);



    const handleCloseAccountAlert = () => setShowAccountAlert(false);
    const handleShowAccountAlert = () => setShowAccountAlert(true);
    const handleCloseBookAlert = () => setShowBookAlert(false);
    const handleShowBookAlert = () => setShowBookAlert(true);
    const handleCloseReviewAlert = () => setShowReviewAlert(false);
    const handleShowReviewAlert = () => setShowReviewAlert(true);


    //populate allReviews
    useEffect(() => {
        booksService
        .find({query:{ownerId: userId,}})
        .then( (bookPage: Paginated<Book>) => {
            setAllBooks( bookPage.data.reverse() );
        })
        .catch( (err: any) => {
            console.log( "problem finding books.");
            console.log(err);
        });

        reviewsService
        .find({query:{userId: userId,}})
        .then( (reviewPage: Paginated<Review>) => {
            setAllReviews( reviewPage.data.reverse() );
        })
        .catch( (err: any) => {
            console.log( "problem finding reviews.");
            console.log(err);
        });

        // Remove deleted book from the books list
        booksService.on('removed', () => {
            booksService
            .find({query:{ownerId: userId,}})
            .then( (bookPage: Paginated<Book>) => {
                setAllBooks( bookPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding books.");
                console.log(err);
            });
        });

        // Remove deleted review from the review list
        reviewsService.on('removed', () => {
            reviewsService
            .find({query:{userId: userId,}})
            .then( (reviewPage: Paginated<Review>) => {
                setAllReviews( reviewPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding reviews.");
                console.log(err);
            });
        });

    }, []);

    const handleDeleteAccount = (userId: string) => {

        setRedirect(true);
        client.logout();

        usersService
        .remove(userId)
        .then((user: any) => {

            const mapBooks = allBooks.map((book: Book) => handleDeleteBook(book._id));
            const mapReviews = allReviews.map((review: Review) => handleDeleteReview(review._id));
            
            handleCloseAccountAlert();

            //analytics
            ReactGA.event({
                category: "User",
                action: "Delete",
            });

        })
        .catch( (err: any) => {
            console.log( "problem deleting user.");
            console.log(err);
        })
    
        
    }

    const handleDeleteBook = (bookId: string) => {
        booksService
        .remove(bookId)
        .then((book: Book) => {
            //analytics
            ReactGA.event({
                category: "Book",
                action: "Delete",
            });
        })
        .catch( (err: any) => {
            // Error: Cannot read property 'ownerId' of undefined
            console.log( "problem deleting book.");
            console.log(err);
        });
        handleCloseBookAlert();
    }

    const handleDeleteReview = (reviewId: string) => {
        reviewsService
        .remove(reviewId)
        .then((review: Review) => {
            //analytics
            ReactGA.event({
                category: "Review",
                action: "Delete",
            });            
        })
        .catch( (err: any) => {
            console.log( "problem deleting review.");
            console.log(err);
        });
        handleCloseReviewAlert();
    }

    if (redirect) {
        return <Redirect to='/home' />
    }

    //all user's books
    const booksCols = allBooks.map((book: Book, index: number) => 
        <Col lg={3} md={2} key={index}>
            <Card className="text-yellow hover-effect shadow m-4 rounded-0 border-0" bg='dark'>
                <NavLink 
                    className='hover-effect text-yellow text-decoration-none' 
                    to={{
                        pathname:`/book/${book._id}`,
                        state: {
                            id: book._id,
                            title: book.title,
                            author: book.author,
                            cover: book.cover,
                            availability: book.availability,
                            owner: book.owner,
                            }
                        }}
                    role="link"
                    aria-label="Click to go to the book's details page"
                > 
                    <Card.Img 
                        variant='top' 
                        src={book.cover} 
                        width={200} 
                        alt={book.title} 
                        aria-label="Book's cover image"
                    />
                    <Card.Body className='align-items-center justify-content-center'>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            <p className='small my-0'>
                                Author: {book.author}
                            </p>
                            <p className='small my-0'>
                                Availability: {book.availability}
                            </p>
                        </Card.Text>
                    </Card.Body>
                </NavLink>
                <Button 
                    id="deleteBookButton"
                    variant="outline-warning" 
                    className="mx-5 mb-3"
                    onClick={e => { handleShowBookAlert(); setBookToDeleteId(book._id);}}
                    role="button" 
                    aria-haspopup="true"
                    aria-controls="deleteBookAlert"
                >
                    Delete book
                </Button>
            </Card>
        </Col>
    );

    //all user's reviews
    const reviewCols = allReviews.map((review: Review, index: number) => 
        <Col key={index} lg={4}>
            <Card className="text-yellow shadow rounded-0 border-0 m-3 p-2" bg='dark'>

                {/* review info */}
                <Card.Title className='montserrat-alternate text-center m-3'>{review.book}</Card.Title>
                <Card.Body className='align-items-center justify-content-center'>
                    <Card.Text>
                        <div className="m-2">
                            <ImQuotesLeft 
                                className='text-yellow'   
                                size={20} 
                            />  
                        </div>
                        <div className="m-2 text-center">
                            {review.text} 
                        </div>
                        <div className="m-2 text-end">
                            <ImQuotesRight 
                                className='text-yellow'  
                                size={20} 
                            />
                        </div>
                    </Card.Text>
                    <Card.Footer className='text-yellow small'>
                    
                    {/* delete review */}
                    <Row>

                        <Col>
                            <FaTrashAlt 
                                id="deleteReviewButton"
                                className='text-yellow hover-effect m-2' 
                                onClick={e => { handleShowReviewAlert(); setReviewToDeleteId(review._id);}}
                                onKeyDown={e => { 
                                    if (e.key === "Enter") {
                                        handleShowReviewAlert();
                                        setReviewToDeleteId(review._id);
                                    }
                                }}
                                tabIndex={0}  
                                role="button"
                                aria-haspopup="true"
                                aria-controls="deleteReviewAlert"
                            />
                        </Col>

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
            
            {/* User info */}            
            <Row>
                <Col className="text-center my-5">
                    <Image 
                        id={userId}
                        src={userAvatar} 
                        width={171}
                        height={180}
                        alt={userEmail}
                        roundedCircle 
                        aria-label={userName + `'s avatar image`}
                    />
                    <h2 className='montserrat-alternate text-yellow text-center'>{userName}</h2>
                </Col>
            </Row>

            {/* Account info */}
            <Row>
                <Col className='my-5'>
                    <div className='shadow p-5'>
                        <h3 className='text-yellow'>Account information</h3>
                        <p className='text-yellow'>User name: {userName}</p>
                        <p className='text-yellow'>Email: {userEmail}</p>
                        <Button 
                            id="deleteAccountButton"
                            variant="outline-warning" 
                            onClick={handleShowAccountAlert}
                            role="button" 
                            aria-haspopup="true"
                            aria-controls="deleteAccountAlert"
                        >
                            Delete account
                        </Button>
                    </div>
                    <Modal
                        id="deleteAccountAlert"
                        show={showAccountAlert}
                        onHide={handleCloseAccountAlert}
                        backdrop="static"
                        keyboard={false}
                        role="alertdialog"
                        aria-labelledby="deleteAccountButton"
                    >
                        <Modal.Header>
                            <Modal.Title>Delete account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            This action cannot be undone.
                            Do you want do delete your account?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant="secondary" 
                                onClick={handleCloseAccountAlert} 
                                role="button" 
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={() => handleDeleteAccount(userId)} 
                                role="button"
                            >
                                Delete account
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </Col>
            </Row>

            {/* Book list */}
            <Row className='shadow p-5'>
                <h3 className='text-yellow'>Books owned</h3>
                {booksCols}

                {/* Book modal */}
                <Modal
                    id="deleteBookAlert"
                    show={showBookAlert}
                    onHide={handleCloseBookAlert}
                    backdrop="static"
                    keyboard={false}
                    role="alertdialog"
                    aria-labelledby="deleteBookButton"
                >
                <Modal.Header>
                    <Modal.Title>Delete book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action cannot be undone.
                    Do you want do delete this book?
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleCloseBookAlert} 
                        role="button" 
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => handleDeleteBook(bookToDeleteId)}
                        role="button"
                    >
                        Delete book
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Row>

            {/* Review list */}
            <Row className='shadow p-5'>
                <h3 className='text-yellow'>Reviews posted</h3>
                {reviewCols}

                {/* Review modal */}
                <Modal
                    id="deleteReviewAlert"
                    show={showReviewAlert}
                    onHide={handleCloseReviewAlert}
                    backdrop="static"
                    keyboard={false}
                    role="alertdialog"
                    aria-labelledby="deleteReviewButton"
                >
                    <Modal.Header>
                        <Modal.Title>Delete review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        This action cannot be undone.
                        Do you want do delete this review?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleCloseReviewAlert}
                            role="button" 
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={() => handleDeleteReview(reviewToDeleteId)}
                            role="button" 
                            >
                            Delete review
                        </Button>
                    </Modal.Footer>
                </Modal>    
            </Row>
        </React.Fragment>  
    );
}

export default Profile;