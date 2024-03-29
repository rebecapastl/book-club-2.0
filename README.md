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

The Book Club is a single-page website that allows users to search for books available for trading or borrowing and write reviews on the books.

## Visit the project: 

https://bookclub.494906.xyz/

## Requirements:

To replicate this project, you will need:

- Google Cloud Platform
- MongoDB Atlas

## Deployment:

Download the files from the repository to your local computer.
The files will be distributed among two folders: frontend and backend.

### CI CD
To perform CI CD in this project, the following environment variables must be present:

| Key | Value | Type | Description |
| --- | ---   | ---  | ---         |
| GOOGLE_CLOUD_CREDENTIALS | Google Cloud Platform Service Account credentials | file |For more information about service accounts, visit Google Cloud Docs: https://cloud.google.com/iam/docs/service-accounts |
| GOOGLE_CLOUD_PROJECT |Google Platform Project ID | variable | To locate your project ID visti API Console Help: https://support.google.com/googleapi/answer/7014113?hl=en |
| MONGODBURI | Connection string to MongoDB | variable | Connection string to the database service in the format ```mongodb+srv://<username>:<password>@cluster0.ltxtw.mongodb.net/<database-name>``` . You can find the connection string for your database on your MongoDB Atlas Account > Database Deployments > Connect > Connect your application. More about MongoDB Atlas connnection strings: https://docs.mongodb.com/manual/reference/connection-string/|

### FRONTEND

Access the frontend folder (```cd frontend```) and install the packages (```yarn install```). 

#### Authentication

For the authentication to work, the socket.io-client needs to be set to the URL where the application will run.
If the application will run in the localhost:PORT, insert a string like ```'http://localhost:3030'```.

To set the URL, edit the ```frontend/src/feathers.ts```.

```
const socket = io('<url-where-thw-application-will-run>');
```


After installation, build the frontend files to be accessed by the backend (```yarn build```), which will build all static files in the folder ```frontend/build```, where they will be accessed by the backend of the project.  
To run only the frontend files, with no interaction with the backend, use the command ```yarn start``` (or choose a port ```PORT=8080 yarn start```).

### BACKEND

You can check the backend configuration file going to ```backend/config/default.json```.

#### Connecting to the database

The feathers backend of the application accesses the mongodb database through a connection string in the following pattern:

```mongodb+srv://<username>:<password>@cluster0.ltxtw.mongodb.net/<database-name>```

This string is represented by the environment variable MONGODBURI (```"mongodb": "MONGODBURI"```).

For the application to connect with the database, the environment variable needs to be:
- replaced by the actual connection string (not recommended)
- set on an environment variables file 
- exported to the coding environment where you will run the application (```export MONGODBURI='mongodb+srv://<username>:<password>@cluster0.ltxtw.mongodb.net/<database-name>'```)


#### Establishing the connection port

The backend of the project runs on a port chosen through and environment variable (```"port": "PORT"```) and reaches for the frontend public files on a specific folder ("public": "../../frontend/build/").

For the port to be set, the environment variable needs to be:
- replaced by the actual port
- set on an environment variables file 
- exported to the coding environment when running the application (```PORT=8080 npm run dev```)


#### Accessing the frontend files

The backend of the project reaches for the frontend public files on a specific folder (```"public": "../../frontend/build/"```).  
If the frontend build files are stored in another folder, the relative path from the backend to that folder needs to be set on the ```backend/config/default.json``` file under ```"public":"new-relative-path"```.


#### Running the project

After setting the variables and building the frontend files, access the backend folder (```cd backend```) and install the packages (```npm install```).  
Run the backend accessing the frontend built files using the command ```npm run dev``` (or choose a port ```PORT=8080 npm run dev```).

#### Analytics

To run ananalytics with Google Analytics on the project, replace the tracking id in ```project/frontend/src/pages/Main.tsx``` with your own GA tracking ID.

```const trackingId = "UA-202922252-1"; // Replace with your Google Analytics tracking ID```

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

No Image user avatar: personal colection 

  
- Book images (books submitted by the application and stored at the bookclub database on MongoDB)  
   
No Image book cover: personal colection 
The Silmarillion and The Hobbit: personal colection

## User Manual:

The Book Club is a single-page website. All the functionalities of the website can be accessed through the menu bar. There are two main categories on the Book Club website: Books and Users.

In this user manual, we will talk about how both can be used.

### SIGN UP

The functionalities of the Book Club can only be accessed by registered users.

- Email field: 
Insert the email into the field Email
- Name field: 
Insert the username into the field Name
- Avatar field (optional):
Copy the URL/URI of the image and paste it into the field Avatar (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox, and Edge)
- Password:
Insert the password (minimum of 8 characters) into the Password field

Press 'Signup now' for the user to be registered into the Book Club database.
After successfully signup, the user will be automatically logged into the database.

### LOG IN

The functionalities of the Book Club can only be accessed by registered users.

- Email field: 
Insert the email used to register in the Book Club into the Email field
- Password:
Insert the password used to register in the Book Club into the Password field

Press 'Login now' for the user to log into the Book Club database.

### BOOK

In this category, you can see all books available in the Book Clube, the book’s reviews, add new books and reviews.

#### See all books:

To see all books, click on the Books navigation item on the menu bar. 
All books will appear in chronological order (the newest book on the left).

#### Add a new book:

To add a new book, click on the button 'Add a book', which will expand a form to be filled with the information: 

- Title field: 
Insert the book’s name to the field Title
- Author field:
Insert the author’s name to the field Author
- Cover field (optional):
Copy the URL/URI of the image and paste it into the field Cover (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox, and Edge)
- Availability field:
Choose from the dropdown if you are registering the book for trading with other users, for borrowing to other users, or if it is available for both

Press 'Add book' for the book to be saved into the Book Club database.

The add book section will be closed upon success and the new book will be exhibited below the add book section in chronological order (the newest on the left).

The user that registered the book will be named the owner of the book.

If there are errors, they will be displayed below the 'Add' button. 

An added book can be deleted only by its owner on the book details page and the owner profile page.

#### See information about a book:

By clicking on any book cover, you will be redirected to a page detailing the book's information, and where a review about the book can be posted.
On that page, you have access to the following information:

- Title
- Author
- Availability
- Owner
- Reviews written

A 'delete book' button will appear below the book information for every book you've registered. By clicking on the delete button, a confirmation pop-up will appear and the book can be deleted.

#### Add a review:

On the book detail page, you can write a review using the 'Add a review' form

- Text field:
Insert a review text between 5 and 300 characters

Press 'Add review' for the review to be saved into the Book Club database.

The new review will be exhibited above all other reviews.

If there are errors, they will be displayed below the text field.

A trash can icon will appear in the footer of every review you've posted. By clicking in the trash can, a confirmation pop-up will appear and the review can be deleted.

### USER

In this category, you can see all users registered in the Book Clube and add new users.

#### See all users:

To see all users, click on the Users navigation item on the menu bar. 
All users will appear in chronological order (the newest user on the left).

#### See information about a user:

By clicking over a user avatar, you will be redirected to a page detailing the user information:
- Name
- Email
- Books registered
- Reviews written
 
### PROFILE

Logged in users can access their profile by clicking on their avatar, on the right of the menu bar.

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

A 'delete book' button will appear below the book information for every book you've registered. By clicking on the delete button, a confirmation pop-up will appear and the book can be deleted.

A 'delete account' button will appear below the account information. By clicking on the delete button, a confirmation pop-up will appear and the account can be deleted.  
Once deleting an account, all books registered and reviews written by the user will also be deleted.

The deletion of an account, a book, or a user cannot be reverted.

### COPY IMAGE URL/URI

- Chrome: Right-click the expanded image and select Copy image address
- Firefox: Right-click the expanded image and select Copy Image Link
- Edge: Right-click the expanded image and select Copy image link
