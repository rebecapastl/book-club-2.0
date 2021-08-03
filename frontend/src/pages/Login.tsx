import React, { useState, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import client from '../feathers';

// analytics
import ReactGA from 'react-ga';

// create service
const usersService = client.service('users');

//create interface to stablish the User type format
interface User {
  email: string,
  password: string,
  avatar: string,
};

function Login(){

    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [userAdded, setUserAdded] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    // Check in the backend if there is the login email on db
    // Check in the backend if the password matches the one in the db
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageClass, setErrorMessageClass] = useState("d-none");

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLFormElement;
        
        // if all fields are validated
        if ( element.checkValidity() ) {
            
            //clean fields
            element.classList.remove('was-validated');
            setEmail("");
            setPassword("");
            setErrorMessage("");
            setErrorMessageClass("d-none");

            //analytics
            ReactGA.event({
                category: "Login",
                action: "Add",
            });
                  
            //authentication
            return client
            .authenticate({
                strategy: 'local',
                email: email,
                password: password,
            })     
            // if error, display
            .catch( (err: any) => {
                // failed to create user
                setErrorMessage( err.message );
                setErrorMessageClass("d-block text-center");
            });

        //if the fields are not valid
        } else {
            element.classList.add('was-validated');
        }

    }

    const handleSignup = (e: FormEvent) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLFormElement;

        // if all fields are validated
        if ( element.checkValidity() ) {
                
            element.classList.remove('was-validated');
            
            // create item in the database
            usersService
            .create({ email, name, password, avatar })
            .then( (user: User) => {

                // successfully created user, clean fields
                setEmail("");
                setName("");
                setPassword("");
                setAvatar("");
                setErrorMessage("");
                setErrorMessageClass("d-none");
                setUserAdded(true);

                //analytics
                ReactGA.event({
                    category: "Signup",
                    action: "Add",
                });

                //authentication
                return client
                .authenticate({
                    strategy: 'local',
                    email: email,
                    password: password,
                }) 
               
            })
            // if error, display
            .catch( (err: any) => {
                // failed to create user
                setUserAdded(false);
                setErrorMessage( err.message );
                setErrorMessageClass("d-block text-center");
            });
        //if the fields are not valid
        } else {
            element.classList.add('was-validated');
        }

    }


    return(
        <React.Fragment>
        <main className='bg-dark'>
        <div className='main-wrapper'>
            <h2 className='montserrat-alternate text-yellow py-5 text-center'>Welcome to the Book Club</h2>

            {/* if login */}
            {showLogin &&
            <Row className="justify-content-center">
                <Col lg={4}>
                    <Form className='p-5 mb-5 shadow' onSubmit={handleLogin} noValidate>
                        <h4 className='text-yellow text-center'>Login to continue</h4>

                        {/* email */}
                        {/* Aria: controlId attribute links all form.groups elements to the same id/label controlId="email"*/}
                        <Form.Group controlId="loginEmail">
                        <Form.Label className='text-yellow d-block pb-0' column='lg'>Email:</Form.Label>
                        <Form.Label className='text-yellow pt-0' column='sm'>Enter your email</Form.Label>
                        <Form.Control 
                            type="email" 
                            maxLength={100}
                            value={email}
                            required 
                            onChange={e => setEmail( e.target.value )}
                        />
                        <Form.Control.Feedback type="invalid" className="text-warning">
                            Invalid email
                        </Form.Control.Feedback>
                        </Form.Group>

                        {/* password */}
                        <Form.Group controlId="loginPassword">
                        <Form.Label className='text-yellow d-block pb-0' column='lg'>Password:</Form.Label>
                        <Form.Label className='text-yellow pt-0' column='sm'>Enter your password</Form.Label>
                        <Form.Control 
                            type="password"
                            minLength={8}
                            maxLength={60}
                            value={password}
                            required 
                            onChange={e => setPassword( e.target.value )}
                        />
                        <Form.Control.Feedback type="invalid" className="text-warning">
                            Password is required
                        </Form.Control.Feedback>
                        </Form.Group>

                        {/* login button */}
                        <div className="hover-effect d-block d-grid my-5" >
                            <Button variant="warning" type="submit" role="button">
                                Login now
                            </Button>
                        </div>

                        {/* error message */}
                        {errorMessage &&
                            <Alert 
                                variant='danger' 
                                className={errorMessageClass}
                                role="alert"
                                dismissible
                                onClose={() => setErrorMessageClass("d-none")}
                            >
                                {errorMessage}
                            </Alert>
                        }

                        {/* disclaimer */}
                        <p className="text-yellow text-center">
                            Not a member yet? 
                            <span 
                                className='hover-effect text-yellow text-decoration-none' 
                                onClick={e => { setShowSignup(true); setShowLogin(false); setErrorMessageClass("d-none"); }}
                                onKeyDown={e => { 
                                    if (e.key === "Enter") {
                                        setShowSignup(true); 
                                        setShowLogin(false); 
                                        setErrorMessageClass("d-none"); 
                                    }
                                }}
                                tabIndex={0}                                
                                role="link"
                            > Sign up </span> now</p>
                    </Form>  
                </Col>
            </Row>  
            }

            {/* if signup */}
            {showSignup &&
            <Row className="justify-content-center">
                <Col lg={4}>
                        
                <Form className='p-5 mb-5 shadow' onSubmit={handleSignup} id='form' noValidate>
                                
                    {/* email */}
                    <h4 className='text-yellow text-center'>Sign up to continue</h4>
                    <Form.Group className='my-3' controlId="email">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Email:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter your email</Form.Label>
                    <Form.Control 
                    type="email" 
                    maxLength={100}
                    value={email}
                    required 
                    onChange={e => setEmail( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                    Invalid email
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* name */}
                    <Form.Group className='my-3' controlId="name">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Name:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter your name</Form.Label>
                    <Form.Control 
                    type="text" 
                    maxLength={60}
                    value={name}
                    required 
                    onChange={e => setName( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                    A name is required
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* avatar */}
                    <Form.Group className='my-3' controlId="avatar">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Avatar:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Paste a URL as an avatar image</Form.Label>
                    <Form.Control 
                    type="text"
                    maxLength={20000}
                    value={avatar}
                    onChange={e => setAvatar( e.target.value )}
                    />
                    </Form.Group>

                    {/* password */}
                    <Form.Group className='my-3' controlId="password">
                    <Form.Label className='text-yellow d-block pb-0' column='lg'>Password:</Form.Label>
                    <Form.Label className='text-yellow pt-0' column='sm'>Enter your password</Form.Label>
                    <Form.Control 
                    type="password"
                    minLength={8}
                    maxLength={60}
                    value={password}
                    required 
                    onChange={e => setPassword( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                    Invalid password
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* submit button */}
                    <div className="hover-effect d-block d-grid my-5" >
                    <Button variant="warning" type="submit" role="button" >
                        Signup now
                    </Button>
                    </div>

                    {/* error message */}
                    {errorMessage &&
                    <Alert 
                        variant='danger' 
                        className={errorMessageClass}
                        role="alert"
                        dismissible
                        onClose={() => setErrorMessageClass("d-none")}
                    >
                        {errorMessage}
                    </Alert>
                    }

                    {/* success message */}
                    {userAdded &&
                    <Alert 
                        variant='warning' 
                        className='text-center'
                        role="alert"
                        dismissible
                        onClose={() => setUserAdded(false)}

                    >
                        User registered successfully!
                    </Alert>
                    }

                    {/* disclaimer */}
                    <p className="text-yellow text-center">
                        Already a member? 
                        <span 
                            className='hover-effect text-yellow text-decoration-none' 
                            onClick={e => { setShowSignup(false); setShowLogin(true); setErrorMessageClass("d-none"); }}
                            onKeyDown={e => { 
                                if (e.key === "Enter") {
                                    setShowSignup(false); 
                                    setShowLogin(true); 
                                    setErrorMessageClass("d-none");
                                } 
                            }}
                            tabIndex={0}
                            role="link"
                        > Login </span> now</p>
                                
                </Form>  

                </Col>
            </Row> 
            }

        </div>
        </main>
        </React.Fragment>  
    );
}

export default Login;