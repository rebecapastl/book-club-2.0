import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { NavLink } from 'react-router-dom';
import AddBook from '../components/AddBook';

import { Paginated } from '@feathersjs/feathers';
import client from '../feathers';

// create service
const booksService = client.service('books');

//create interface to establish the Book type format
interface Book {
    _id: string,
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
};

function Books(){

    const [openAddBook, setOpenAddBook] = useState(false);
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);

    //populate allBooks
    useEffect(() => {
        booksService
        .find()
        .then( (bookPage: Paginated<Book>) => {
            setAllBooks( bookPage.data );
        })
        .catch( (err: any) => {
            console.log( "problem finding books.");
            console.log(err);
        });
    }, []);

    //all books
    const booksCols = allBooks.map((book: Book, index: number) => 
        <Col key={index}>
            <NavLink 
                className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' 
                to={{
                    pathname:'/details',
                    state: {
                        id: book._id,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        availability: book.availability,
                        owner: book.owner,
                        }
                    }}
            >                       
                <Card className="text-yellow hover-effect shadow rounded-0 border-0 m-5" bg='dark'>
                    <Card.Img variant='top' src={book.cover} width={200} alt={book.title} />
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
                aria-controls="add-book"
                aria-expanded={openAddBook}
            >
                Add a book
            </Button>

            <Collapse in={openAddBook}> 
                <div id="add-book">
                    <AddBook setOpenAddBook={setOpenAddBook}/>
                </div>
            </Collapse>

            <h2 className='montserrat-alternate text-yellow text-center'>Available books</h2>   

            <Row xs={1} md={2} lg={4}>
                {booksCols}
                        <Col>
            <NavLink 
                className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' 
                to={{
                    pathname:'/details',
                    state: {
                        id: "someID",
                        title: "silma",
                        author: "tolkien",
                        cover: "data:image/jpeg;base64,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",                        
                        availability: "borrowing",
                        owner: "me",
                        }
                    }}
            >                       
                <Card className="text-yellow hover-effect shadow rounded-0 border-0 m-5" bg='dark'>
                    <Card.Img variant='top' src="" width={200} alt="silma" />
                    <Card.Body className='align-items-center justify-content-center'>
                        <Card.Title>Silma</Card.Title>
                        <Card.Text>
                            <p className='small my-0'>
                                Author: Tolkien
                            </p>
                            <p className='small my-0'>
                                Availability: Borrowing
                            </p>
                            <p className='small my-0'>
                                Owner: Me
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </NavLink>
        </Col>

            </Row>

            
            
        </React.Fragment>  
    );
}

export default Books;