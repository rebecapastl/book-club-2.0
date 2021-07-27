import React, { useState, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// analytics
import ReactGA from 'react-ga';

import client from '../feathers';

// create service
const reviewsService = client.service('reviews');

//create interface to establish the Book type format
interface Review {
    _id: string,
    text: string,
    user: string,
    book: string,
    userId: string,
    bookId: string,
};

//create interface to establish the Book type format
interface BookProps {
    book: string,
    bookId: string,
}

function AddReview(props: BookProps){

    const [text, setText] = useState("");
    const [user, setUser] = useState("Rebeca");
    const [book, setBook] = useState(props.book);
    const [userId, setUserId] = useState("123456");
    const [bookId, setBookId] = useState(props.bookId);
    const [generalErrorMessage, setGeneralErrorMessage] = useState("");
    const [generalErrorMessageClass, setGeneralErrorMessageClass] = useState("d-none");

    const handleAddReview = (e: FormEvent) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLFormElement;

        // if all fields are validated
        if ( element.checkValidity() ) {

            element.classList.remove('was-validated');

            // create item in the database
            reviewsService
            .create({ text, user, book, userId, bookId })
            .then( (review: Review) => {
                // successfully created review
                setText("");
                setGeneralErrorMessage("");
                ReactGA.event({
                    category: "AddReview",
                    action: "Add",
                });
            })
            .catch( (err: any) => {
                // failed to create review
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
            <Form className='p-5 mb-5 shadow' onSubmit={handleAddReview} noValidate>
                <h2 className='montserrat-alternate text-yellow text-center'>Add a review</h2>
                <Row className="mb-3" >

                    {/* text */}
                    <Form.Group as={Col} controlId="formGridText">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Review:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter your review up to 300 characters</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        style={{ height: '10rem' }}
                        minLength={5}
                        maxLength={300}
                        value={text}
                        required 
                        onChange={e => setText( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                        Your review must have from 5 to 300 characters
                    </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Row>     
                    {/* Add button */}
                    <div className="col-lg-3 hover-effect d-block d-grid my-3" >
                        <Button variant="warning" type="submit">
                            Add review
                        </Button>
                    </div>

                    {/* failure message */}
                    {generalErrorMessage &&
                        <Alert variant='danger' className={generalErrorMessageClass}>
                            {generalErrorMessage}
                        </Alert>
                    }
                </Row> 

            </Form>

        </React.Fragment>
     );
}

export default AddReview;