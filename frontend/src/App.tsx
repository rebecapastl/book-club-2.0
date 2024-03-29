import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import './css/app.css'
import { Paginated } from '@feathersjs/feathers';

//Authentication
import client from './feathers';

//Feathers + MongoDB
// create service
const usersService = client.service('users');
const booksService = client.service('books');
const reviewsService = client.service('reviews');

//create interface to establish the Book type format
interface Book {
    _id: string,
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
    ownerId: string,
};

//create interface to establish the User type format
interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
};

//create interface to establish the User type format
interface Review {
    _id: string,    
    text: string,
    user: string,
    book: string,
    userId: string,
    bookId: string,
}


function App() {

    const [login, setLogin] = useState(null);
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);
    const [allUsers, setAllUsers] = useState<Array<User>>([]);
    const [allReviews, setAllReviews] = useState<Array<Review>>([]);

    // Authentication
    useEffect(() => {

        client.authenticate().catch(() => {
            setLogin(null);
        });

        client.on('authenticated', loginResult => {

            //get books and users
            Promise.all([
                usersService.find(),
                booksService.find(),
                reviewsService.find(),
            ]).then(([usersPage, booksPage, reviewsPage]) => {
                // We want the books and users in the reversed order
                setAllUsers(usersPage.data.reverse());
                setAllBooks(booksPage.data.reverse());
                setAllReviews(reviewsPage.data.reverse());
                setLogin(loginResult);

            });
        });

        // On logout reset all all local state (which will then show the login screen)
        client.on('logout', () => {
            setLogin(null);
            setAllBooks([]);
            setAllUsers([]);
            setAllReviews([]);
        });

        // Add new books to the books list
        booksService.on('created', (book: any) => {
            // concat() appends the newest book at the end of the book list
            // setAllBooks(currentBooks => currentBooks.concat(book))

            booksService
            .find({})
            .then( (bookPage: Paginated<Book>) => {
                setAllBooks( bookPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding books.");
                console.log(err);
            });

        });

        // Add new users to the user list
        usersService.on('created', (user: any) => {
            // concat() appends the newest user at the end of the user list
            // setAllUsers(currentUsers => currentUsers.concat(user))

            usersService
            .find({})
            .then( (userPage: Paginated<User>) => {
                setAllUsers( userPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding users.");
                console.log(err);
            });
        });

        // Add new review to the review list
        reviewsService.on('created', (review: any) => {
            // concat() appends the newest review at the end of the review list
            // setAllReviews(currentReviews => currentReviews.concat(review))

            reviewsService
            .find({})
            .then( (reviewPage: Paginated<Review>) => {
                setAllReviews( reviewPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding reviews.");
                console.log(err);
            });
        });

        // Remove deleted book from the books list
        booksService.on('removed', (book: any) => {
            booksService
            .find({})
            .then( (bookPage: Paginated<Book>) => {
                setAllBooks( bookPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding books.");
                console.log(err);
            });
        });

        // Remove deleted user from the user list

        usersService.on('removed', (user: any) =>{
            usersService
            .find({})
            .then( (userPage: Paginated<User>) => {
                setAllUsers( userPage.data.reverse() );
            })
            .catch( (err: any) => {
                console.log( "problem finding users.");
                console.log(err);
            });
        });

    }, []);

    //pass on allBooks and allUsers to the children components

  if (login === undefined) {
    return (
      <main className="container text-center">
        <h1>Loading...</h1>
      </main>
    );
  } else if (login) {
    return <Main allBooks={allBooks} allUsers={allUsers} allReviews={allReviews}/>;
  }
  
  return (
    <React.Fragment>
        <Header />
        <Login />
    </React.Fragment>

  );

}

export default App;
