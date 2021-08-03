import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

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

//cannot be rendered by itslf, it needs to be called from Books (NavLink props)
function UserDetails(props:userDetails){

    const userId = props.location.state.id;
    const userEmail = props.location.state.email;
    const userName = props.location.state.name;
    const userAvatar = props.location.state.avatar;

    const [allReviews, setAllReviews] = useState<Array<Review>>([]);
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);

    //populate allBooks
    useEffect(() => {
        booksService
        .find({
            query:{
                ownerId: userId,
            }
        })
        .then( (bookPage: Paginated<Book>) => {
            setAllBooks( bookPage.data );
        })
        .catch( (err: any) => {
            console.log( "problem finding books.");
            console.log(err);
        });
    }, []);

    //all books by one user
    const booksCols = allBooks.map((book: Book, index: number) => 
        <Col lg={3} md={2} key={index}>
            <NavLink 
                className='hover-effect text-yellow m-1 p-2 text-decoration-none' 
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
                <Card className="text-yellow hover-effect shadow m-4 rounded-0 border-0" bg='dark'>
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
                </Card>
            </NavLink>
        </Col>
    );

    //populate allReviews
    useEffect(() => {
        reviewsService
        .find({
            query:{
                userId: userId,
            }
        })
        .then( (reviewPage: Paginated<Review>) => {
            setAllReviews( reviewPage.data );
        })
        .catch( (err: any) => {
            console.log( "problem finding reviews.");
            console.log(err);
        });
    }, []);

    //all reviews by one user
    const reviewCols = allReviews.map((review: Review, index: number) => 
        <Col key={index} lg={4}>
            <Card className="text-yellow shadow rounded-0 border-0" bg='dark'>
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
                    <Card.Footer className='text-yellow small text-end'>
                        {review.user}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );

    return(
        <React.Fragment>
            <NavLink className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' to='/users'>
                <RiArrowGoBackFill 
                    className='text-yellow hover-effect d-md-inline-block'   
                    size={20} 
                    role="link"
                    aria-label="Back to Users"   
                /> Back to Users
            </NavLink>
            <h2 className='montserrat-alternate text-yellow text-center'>{userName}</h2>            
            <Row>
                <Col className="text-center my-5">
                    <Image 
                        className='d-block mx-auto my-4'
                        src={userAvatar} 
                        width={171}
                        height={180}
                        alt={userName}
                        roundedCircle 
                        aria-label="User avatar image"
                    />
                    <a 
                        className='text-yellow text-decoration-none hover-effect my-3' 
                        href={`mailto:` + userEmail}
                        aria-label="Click here to send an email to this user"
                    >
                        {userEmail}
                    </a>
                </Col>
            </Row>

            {/* books */}
            <Row className='shadow p-5'>
                <h3 className='text-yellow'>Books owned</h3>
                {booksCols}
            </Row>

            {/* reviews */}
            <Row className='shadow p-5'>                   
                <h3 className='text-yellow'>Reviews posted</h3>
                {reviewCols}
            </Row>
        </React.Fragment>  
    );
}

export default UserDetails;