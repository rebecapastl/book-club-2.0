import React from 'react';
import { Nav, Navbar as Bar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';



function NavBar(){
    return(
                <Bar collapseOnSelect className="shadow bg-dark p-2 mb-5" variant='dark' expand="lg">
                    <Bar.Brand className='mx-5 my-2'>
                        <NavLink className='hover-effect text-yellow mr-3 text-decoration-none' to='/home'>
                            <FaBook size={30}/> <span className='h4'>Book Club</span>
                        </NavLink>
                    </Bar.Brand>
                    <Bar.Toggle className='my-2 text-yellow' aria-controls="responsive-navbar-nav" />
                    <Bar.Collapse id="responsive-navbar-nav position-relative">
                        <Nav className="mr-auto">
                            <Nav.Item className='hover-effect'>
                                <NavLink className='hover-effect text-yellow h5 mx-3 my-auto p-2 text-decoration-none' to='/books'>
                                    Books
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item className='hover-effect'>
                                <NavLink className='hover-effect text-yellow h5 mx-3 my-auto p-2 text-decoration-none' to='/users'>
                                    Users
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item className="hover-effect position-absolute end-0">
                                <NavLink className='hover-effect text-yellow h5 mx-3 my-auto p-2 text-decoration-none' to='/'>
                                    Login
                                </NavLink>
                            </Nav.Item>
                        </Nav>
                    </Bar.Collapse>
                </Bar>

    );
}

export default NavBar;