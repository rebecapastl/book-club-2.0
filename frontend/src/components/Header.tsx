import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/header.css'

function Header(){
    return(
        <header> 
            <Card className='border-0'>
                <Card.Img 
                    className='rounded-0' 
                    src="./images/banner.jpg" 
                    alt="Book Club banner" 
                    role="banner"
                    aria-label="A shelf full of books"
                />
                <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                    <Card.Title>
                        <h1 className='header display-1'>Book Club</h1>
                    </Card.Title>
                </Card.ImgOverlay>
                <Card.ImgOverlay className='d-flex flex-column justify-content-end'>
                    <Card.Text className='artist small mb-0 text-yellow text-end '>
                        Photo by Pixabay on 
                        {/* Aria: <a> tag has 'aria link role' already set by the browser */}
                        <a 
                            className='text-muted text-decoration-none' 
                            href="https://www.pexels.com/photo/books-in-black-wooden-book-shelf-159711/" 
                            target="_blank" 
                            rel="noreferrer"
                            aria-label="Click to visit the banner artist on Pexels"
                        >
                            Pexels
                        </a>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </header> 
    );
}

export default Header;