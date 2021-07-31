import React, {useState} from 'react';
import { Nav, Navbar as Bar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaBook } from 'react-icons/fa';

//Authentication
import client from '../feathers';

//create interface to establish the User type format
interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
};

function NavBar(){

    const [currentUser, setCurrentUser] = useState<Partial<User>>({});


    client.get('authentication')
    .then((result: any) => { 
        setCurrentUser(result.user);
    });

    return(
        <Bar collapseOnSelect className="shadow bg-dark p-2 mb-5" variant='dark' expand="lg">
            <Bar.Brand className='mx-5 my-2'>
                <NavLink className='hover-effect text-yellow mr-3 text-decoration-none' to='/home'>
                    <FaBook size={30}/> <span className='h4'>Book Club</span>
                </NavLink>
            </Bar.Brand>
            <Bar.Toggle className='my-2 text-yellow' aria-controls="responsive-navbar-nav" />
            <Bar.Collapse id="responsive-navbar-nav position-relative mr-5">
                <Nav className="mr-auto">

                    {/* books */}
                    <Nav.Item className='hover-effect'>
                        <NavLink className='hover-effect text-yellow h5 mx-3 my-auto p-2 text-decoration-none' to='/books'>
                            Books
                        </NavLink>
                    </Nav.Item>

                    {/* users */}
                    <Nav.Item className='hover-effect'>
                        <NavLink className='hover-effect text-yellow h5 mx-3 my-auto p-2 text-decoration-none' to='/users'>
                            Users
                        </NavLink>
                    </Nav.Item>

                    <Row className="position-absolute end-0">

                        {/* logout */}
                        <Col>                            
                            <Nav.Item className="hover-effect" >
                                <p className="text-yellow ml-4 h5" onClick={() => client.logout()}>
                                Logout
                                </p>
                            </Nav.Item>
                        </Col>

                        {/* profile icon */}
                        <Col>
                            <Nav.Item>
                                <NavLink 
                                    className='hover-effect my-auto p-2 mr-4 pr-5' 
                                    to={{
                                        pathname:'/profile',
                                        state: {
                                            id: currentUser._id,
                                            email: currentUser.email,
                                            name: currentUser.name,
                                            avatar: currentUser.avatar,
                                        }
                                    }}
                                >
                                    <Image 
                                        src={currentUser.avatar} 
                                        width={30}
                                        height={30}
                                        alt={currentUser.name}
                                        className="mr-5"                                    
                                        roundedCircle 
                                    />
                                </NavLink>
                            </Nav.Item>
                        </Col>
                    </Row>
                </Nav>
            </Bar.Collapse>
        </Bar>

    );
}

export default NavBar;