import React, { useState, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { CgClose } from 'react-icons/cg';
// analytics
import ReactGA from 'react-ga';

import client from '../feathers';

//create interface to establish the props type format
interface AddBookProps {
    //             function signature
    setOpenAddBook: (arg: boolean) => void,
}

// create service
const booksService = client.service('books');

//create interface to establish the Book type format
interface Book {
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
    ownerId: string,
};

function AddBook(props: AddBookProps){

    const [bookAdded, setBookAdded] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [availability, setAvailability] = useState("");
    const [generalErrorMessage, setGeneralErrorMessage] = useState("");
    const [generalErrorMessageClass, setGeneralErrorMessageClass] = useState("d-none");

    const handleAddBook = (e: FormEvent) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLFormElement;

        // if all fields are validated
        if ( element.checkValidity() ) {

            
            console.log({ title, author, cover, availability });
            element.classList.remove('was-validated');

            // create item in the database
            booksService
            .create({ title, author, cover, availability })
            .then( (book: Book) => {
                // successfully created book
                setTitle("");
                setAuthor("");
                setCover("");
                setAvailability("");
                setBookAdded(true);
                setGeneralErrorMessage("");
                ReactGA.event({
                    category: "AddBook",
                    action: "Add",
                });

            })
            .catch( (err: any) => {
                // failed to create book
                setBookAdded(false);
                setGeneralErrorMessage( err.message );
                setGeneralErrorMessageClass("d-block text-center");
            });
        } else {
            //if the fields are not valid
            element.classList.add('was-validated');
        }
    }

    return(
        <React.Fragment>
            <Form className='p-5 mb-5 shadow' onSubmit={handleAddBook} noValidate>
                {/* close button floating right */}
                <CgClose 
                        className='text-white d-md-inline-block' 
                        size={30} 
                        onClick={e => {
                            props.setOpenAddBook(false);
                            setTitle("");
                            setAuthor("");
                            setCover("");
                            setAvailability("");
                            //set validation to classList.remove('was-validated');
                        }}
                        role="button"  
                        aria-label="close"
                    />
                <h2 className='montserrat-alternate text-yellow text-center'>Add a book</h2>
                <Row className="mb-3" >

                    {/* title */}
                    {/* Aria: controlId attribute links all form.groups elements to the same id/label controlId="title"*/}
                    <Form.Group as={Col} lg={3} controlId="title">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Title:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter book title</Form.Label>
                    <Form.Control 
                        type="text" 
                        maxLength={100}
                        value={title}
                        required 
                        onChange={e => setTitle( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning" role="alert">
                        Enter a title for the boook.
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* author */}
                    <Form.Group as={Col} lg={3} controlId="author">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Author:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter author name</Form.Label>
                    <Form.Control 
                        type="text"
                        maxLength={60}
                        value={author}
                        required 
                        onChange={e => setAuthor( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning" role="alert">
                        If there is no author, insert "Unknown author".
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* cover */}
                    <Form.Group as={Col} sm={12} md={6} lg={3} controlId="cover">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Cover:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Paste a URL for the book cover</Form.Label>
                    <Form.Control 
                        type="text"
                        maxLength={20000}
                        value={cover}
                        onChange={e => setCover( e.target.value )}
                    />
                    </Form.Group>

                    {/* availability */}
                    <Form.Group as={Col} md={6} lg={3} controlId="availability">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Availability:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>The book is available for...</Form.Label>
                    <Form.Control 
                        as='select' 
                        className='form-select'
                        value={availability} 
                        required 
                        onChange={e => {setAvailability( e.target.value )}}
                    >
                        <option value="" className="d-none" selected></option>
                        <option value="Borrowing">Borrowing</option>
                        <option value="Trading">Trading</option>
                        <option value="Both">Both</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" className="text-warning" role="alert">
                        Choose an option from the availability list.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row>     
                    {/* Add book button */}
                    <div className="col-lg-3 hover-effect d-block d-grid my-3" >
                        <Button 
                            variant="warning" 
                            type="submit"
                            role="button"
                        >
                            Add book
                        </Button>
                    </div>

                    {/* Success message */}
                    {bookAdded &&
                        <Alert 
                            variant='warning' 
                            className='text-center'
                            role="alert"
                        >
                            Book added successfully!
                        </Alert>
                    }

                    {/* failure message */}
                    {!bookAdded && generalErrorMessage &&
                        <Alert 
                            variant='danger' 
                            className={generalErrorMessageClass}
                            role="alert"
                        >
                            {generalErrorMessage}
                        </Alert>
                    }
                </Row> 


            </Form>

        </React.Fragment>
     );
}

export default AddBook;