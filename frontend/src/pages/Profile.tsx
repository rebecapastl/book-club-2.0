import React, { MouseEvent, useState} from 'react';
import { Redirect } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//create interface to establish the props type format
interface userDetails {
    location: {
        state: {
            id: string,
            email: string,
            avatar: string,
        }
    }
}

function Profile(props:userDetails){

  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [userId, setUserId] = useState(props.location.state.id);
  const [userEmail, setUserEmail] = useState(props.location.state.email);
  const [userAvatar, setUserAvatar] = useState(props.location.state.avatar);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleDeleteAccount = (e: MouseEvent) => {
        e.preventDefault();
        console.log('delete account');
        handleClose();
        setRedirect(true);
        
    }

    if (redirect) {
        return <Redirect to='/' />
    }
    
    return(
        <React.Fragment>
            <h2 className='montserrat-alternate text-yellow text-center'>{userEmail}</h2>            
            <Row>
                <Col className="text-center my-5">
                    <Image 
                        src={userAvatar} 
                        width={171}
                        height={180}
                        alt={userEmail}
                        roundedCircle 
                    />
                </Col>
            </Row>

            <Row>
                <Col className='my-5'>
                    <div className='shadow p-5'>
                        <h3 className='text-yellow'>Account information</h3>
                        <p className='text-yellow'>User name: {userEmail}</p>
                        <p className='text-yellow'>Email:{userEmail}</p>
                        <Button variant="outline-warning" onClick={handleShow}>Delete account</Button>
                    </div>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Delete account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            This action cannot be undone.
                            Do you want do delete your account?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDeleteAccount}>
                                Delete account
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </Col>
            </Row>

            <Row>
                <Col className='my-5'>
                    <div className='shadow p-5'>
                        <h3 className='text-yellow'>Books owned</h3>
                        <p className='text-yellow'>Books</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='my-5'>
                    <div className='shadow p-5'>
                        <h3 className='text-yellow'>Reviews posted</h3>
                        <p className='text-yellow'>Reviews</p>
                    </div>
                </Col>
            </Row>
        </React.Fragment>  
    );
}

export default Profile;