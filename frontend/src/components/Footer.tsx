import React from 'react';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ImGithub } from 'react-icons/im';
import { ImLinkedin } from 'react-icons/im';
import { SiTiktok } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { SiFacebook } from 'react-icons/si';
import { SiDiscord } from 'react-icons/si';

function Footer(){
    return(
        <React.Fragment>
            <footer className="mt-5 py-4 px-5 border-top border-warning text-center"> 
                <div className="footer-title">
                    <span className="text-yellow fs-3 fw-lighter bg-dark px-5">Book Club</span>
                </div>    
                <Row className="my-5">
                    <Col lg={2}>
                    </Col>
                    <Col lg={2} className='text-yellow'>
                        <span className="text-yellow fs-5 fw-bolder">Book Club</span>
                        <div className="mt-3">
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/books'
                                role="link"
                                aria-label="Go to Books"

                            >
                                Books
                            </NavLink>
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/users'
                                role="link"
                                aria-label="Go to Users"

                            >
                                Users
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={2} className='text-yellow'>
                        <span className="text-yellow fs-5 fw-bolder">Community</span>
                        <div className="mt-3">
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to Meetings"

                            >
                                Meetings
                            </NavLink>
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to Virtual Meetings"
                            >
                                Virtual meetings
                            </NavLink>
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to Trading Fairs"
                            >
                                Trading fairs
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={2} className='text-yellow'>
                        <span className="text-yellow fs-5 fw-bolder">About</span>
                        <div className="mt-3">
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to Maintainers"
                            >
                                Maintainers
                            </NavLink>
                            <NavLink 
                            className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to License"
                            >
                                License
                            </NavLink>
                            <NavLink 
                                className='text-yellow text-decoration-none hover-effect d-block my-2'  
                                to='/' 
                                role="link"
                                aria-label="Go to Volunteer"
                            >
                                Volunteer
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={4} className="text-lg-end">
                        <div className="mb-5 text-center">
                            {/* <a> tag has 'aria link role' already set by the browser */}
                            <a 
                                className='text-yellow hover-effect'  
                                href='https://www.tiktok.com/' 
                                target="_blank" 
                                rel="noreferrer"
                                aria-label="Click to go to Book Club on Tik Tok"
                            >
                                <SiTiktok 
                                    className='m-4' 
                                    size={40} 
                                />
                            </a>  
                            <a 
                                className='text-yellow hover-effect' 
                                href='https://www.instagram.com/' 
                                target="_blank" 
                                rel="noreferrer"
                                aria-label="Click to go to Book Club on Instagram"
                            >
                                <SiInstagram 
                                    className='m-4'
                                    size={40} 
                                />
                            </a>
                            <a 
                                className='text-yellow hover-effect'  
                                href='https://twitter.com/' 
                                target="_blank" 
                                rel="noreferrer"
                                aria-label="Click to go to Book Club on Twitter"
                            >
                                <SiTwitter 
                                    className='m-4' 
                                    size={40} 
                                />
                            </a>  
                            <a 
                                className='text-yellow hover-effect' 
                                href='https://www.facebook.com/' 
                                target="_blank" 
                                rel="noreferrer"
                                aria-label="Click to go to Book Club on Facebook"
                            >
                                <SiFacebook 
                                    className='m-4' 
                                    size={40} 
                                />
                            </a>
                            <a 
                                className='text-yellow hover-effect' 
                                href='https://discord.com/' 
                                target="_blank" 
                                rel="noreferrer"
                                aria-label="Click to go to Book Club on Discord"
                            >
                                <SiDiscord 
                                    className='m-4' 
                                    size={40} 
                                />
                            </a>
                        </div>
                        <div className="mt-5">
                            <a 
                                className='text-yellow hover-effect mx-2' 
                                href='https://github.com/RebecaPastl'
                                aria-label="Visit Rebeca Pastl's page on GitHub"
                            >
                                <ImGithub 
                                    size={20} 
                                />
                            </a>  
                            <a 
                                className='text-yellow hover-effect mx-2' 
                                href='https://www.linkedin.com/in/rebeca-pastl-b4b000116/'
                                aria-label="Visit Rebeca Pastl's page on LinkedIn"
                            >
                                <ImLinkedin 
                                    size={20}
                                />
                            </a>
                            <span><p className='text-yellow small my-0'>Rebeca Pastl</p></span>
                            <a 
                                className='text-yellow text-decoration-none small hover-effect' 
                                href='mailto:rvieiracosta00@mylangara.ca'
                                aria-label="Click to send an email to Rebeca Pastl on rvieiracosta00@mylangara.ca"
                            >
                                rvieiracosta00@mylangara.ca
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="text-center">
                    <p className='text-yellow small my-3'>Copyright&copy; of all the images are from free source websites.</p>
                </Row> 
            </footer> 
        </React.Fragment>
    );
}

export default Footer;