# Book Club

## Table of Contents
* [Description](#description)
* [Requirements](#requirements)
* [Deployment](#deployment)
* [Developer](#developer)
* [License](#license)
* [Acknowledgements](#acknowledgments)
* [Citations](#citations)
* [Manual](#manual)

## Description:

The Book Club is a single-page website tha allows users to search for books available for trading or borrowing and writing reviews on the books.

## Requirements:

## Deployment:


## Developer:

Rebeca Pastl

## License: 

ISC

## Acknowledgments:

This project was developed during CPSC 2600 classes (Fall 2020, instructor Jordan Miller) and refactored during CPSC 2650 (Summer 2021, instructor Brian Koehler).

## Citations and references:

- Banner image (used on file Style.css line 94, stored on folder public > images > banner.jpg) 

Source: Pexels (Free stock photos)  
Author: Pixabay  
Web address: https://www.pexels.com/photo/books-in-black-wooden-book-shelf-159711  

- User images (users submitted by the application and stored at the bookclub database on MongoDB)

Source: Pexels (Free stock photos)  
Author: Laura Garcia  
Web address: https://www.pexels.com/photo/photo-of-old-man-wearing-sun-hat-3271268/  
  
Source: Pexels (Free stock photos)  
Author: Edu Carvalho  
Web address: https://www.pexels.com/photo/selective-focus-photography-of-woman-standing-near-green-plant-2050976/  
  
Source: Pexels (Free stock photos)  
Author: Maria Orlova  
Web address: https://www.pexels.com/photo/crop-serene-woman-standing-with-eyes-closed-against-light-wall-4906286/  
  
Source: Pexels (Free stock photos)  
Author: Bruno Thethe  
Web address: https://www.pexels.com/photo/man-leaning-on-red-cushion-2122850/  
  
- Book images (books submitted by the application and stored at the bookclub database on MongoDB)  
  
The Silmarillion and the Hobbit covers: personal collection  

## User Manual:

The Book Club is a single-page website. All the functionalities of the website can be accessed through the menu bar. There are two main categories on the Book Club website: Books and Users.

In this user manual, we will talk about how both can be used.

### SIGN UP

The functionalities of the Book Club can only be accessed by regitered users.

- Name field: 
Insert the username (with a minimum length of 5 characters) into the field Name
- Avatar field:
Copy the URL/URI of the image and paste it into the field Avatar (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox and Edge)

### LOG IN

### BOOK

In this category, you can see all books available in the Book Clube, the book’s reviews, add new books and reviews.

See all books:

To see all books, click on the Show all books button on the top of the books’ section. All books will appear by the right of the book section in chronological order (the newest book above).

See information about a book:

By clicking over a book cover, you will be redirected to a page detailing the book iformation, where a review about the book can be posted:
- Title
- Author
- Availability
- Owner
- Reviews written

Add a review:

In the book detail page you can write a review usinf the 'Add a review' form

- Text field:
Insert a review text between 5 and 300 characters

Press 'Add review' for the review to be saved into the Book Club database.

The new review will be exhibited above all other reviews.

If there are errors, they will be displayed below the text field.

A trash can icon will appear in the footer of every review you've posted. By clicking in the trash can, a confirmation pop up will appear and the review can be deleted.

Add a new book:

To add a new book, click on the button 'Add a book', which will expand a form to be filled with the information: 

- Title field: 
Insert the book’s name to the field Title
- Author field:
Insert the author’s name to the field Author
- Cover field:
Copy the URL/URI of the image and paste it into the field Cover (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox and Edge)
- Availability field:
Choose from the dropdown if you are registering the book for trading with other users, for borrowing to other users, or if it is available for both

Press 'Add' for the book to be saved into the Book Club database.

The add book section will be closed upon success and the new book will be exhibited below the add book section in chronological order (the newest on the left).

The user that registered the book will be named the owner of the book.

If there are errors, they will be displayed below the 'Add' button. 

An added book can be deleted only by its owner in the book details page and the owner profile page.

### USER

In this category, you can see all users registered in the Book Clube and add new users.

See all users:

When you access the Users button through the menu bar, all users will appear below in chronological order (the newest on the left).

See information about a user:

By clicking over a user avatar, you will be redirected to a page detailing the user iformation:
- Name
- Email
- Books registered
- Reviews written
 
### PROFILE

Loged in users can access their profile by clicking on their avatar, on the right of the menu bar.

The user can see its detailed information, manage its account, books registered and reviews written.

Account information:
- Name
- Email
- Delete account button

Books owned:
- Books registered
- Delete button to each book

Reviews posted:
- Reviews written by the user
- Delete icon to each review

The deletion of account, book or user cannot be reverted.
Once deleting an account, all books registered and reviews written by the user will also be deleted.

### COPY IMAGE URL/URI

In the image result page, click the image once to expand it and:
- Chrome: Right-click the expanded image and select Copy image address
- Firefox: Right-click the expanded image and select Copy Image Link
- Edge: Right-click the expanded image and select Copy image link
