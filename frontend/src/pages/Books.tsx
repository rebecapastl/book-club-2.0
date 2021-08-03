import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { NavLink } from 'react-router-dom';
import AddBook from '../components/AddBook';

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

function Books(props: { allBooks: Book[] }){

    const [openAddBook, setOpenAddBook] = useState(false);
    const allBooks = props.allBooks;

    //all books
    const booksCols = allBooks.map((book: Book, index: number) => 
        <Col key={index}>
            <NavLink 
                className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' 
                to={{
                    pathname:`/book/${book._id}`,
                    state: {
                        id: book._id,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        availability: book.availability,
                        owner: book.owner,
                        ownerId: book.ownerId,
                        }
                    }}
                role="link"
                aria-label="Click to go to the book's details page"  
            >                       
                <Card className="text-yellow hover-effect shadow rounded-0 border-0 m-5" bg='dark'>
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
                            <p className='small my-0'>
                                Owner: {book.owner}
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </NavLink>
        </Col>
    
    );

    return(
        <React.Fragment>

            <Button 
                variant='warning'         
                className="hover-effect mb-4 mx-5"
                onClick={() => setOpenAddBook(!openAddBook)}
                role="button"
                aria-controls="addBook"
                aria-expanded={openAddBook}
            >
                Add a book
            </Button>

            <Collapse in={openAddBook}> 
                <div id="addBook">
                    <AddBook setOpenAddBook={setOpenAddBook}/>
                </div>
            </Collapse>

            <h2 className='montserrat-alternate text-yellow text-center'>Available books</h2>   

            <Row xs={1} md={2} lg={4}>
                {booksCols}
            </Row>

            
            
        </React.Fragment>  
    );
}

export default Books;