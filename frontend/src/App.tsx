import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import './css/app.css'

//Authentication
import client from './feathers';

//Feathers + MongoDB
// create service
const usersService = client.service('users');
const booksService = client.service('books');

//create interface to establish the Book type format
interface Book {
    _id: string,
    title: string,
    author: string,
    cover: string,
    availability: string,
    owner: string,
};

//create interface to establish the User type format
interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
};


function App() {

    const [login, setLogin] = useState(null);
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);
    const [allUsers, setAllUsers] = useState<Array<User>>([]);


    // Authentication
    useEffect(() => {

        client.authenticate().catch(() => {
            setLogin(null);
            console.log('authenticate catch')
        });

        client.on('authenticated', loginResult => {
            console.log(loginResult);
            //get books and users
            Promise.all([
                usersService.find(),
                booksService.find(),
            ]).then(([booksPage, usersPage]) => {
                // We want the books and users in the reversed order
                const booksResult = booksPage.data.reverse()
                const usersResult = usersPage.data.reverse()

                setAllBooks(booksResult);
                setAllUsers(usersResult);
                setLogin(loginResult);

                console.log(allBooks);
                console.log(allUsers);
                

            });
            //log page
            console.log('authenticated loginResult log page')
        });

        // On logout reset all all local state (which will then show the login screen)
        client.on('logout', () => {
            setLogin(null);
            setAllBooks([]);
            setAllUsers([]);
        });

        // Add new books to the books list
        booksService.on('created', (book: any) =>
            setAllBooks(currentBooks => currentBooks.concat(book))
        );

        // Add new users to the user list
        usersService.on('created', (user: any) =>
            setAllUsers(currentUsers => currentUsers.concat(user))
        );

    }, []);

    //pass on allBooks and allUsers to the children components

  if (login === undefined) {
    console.log('undefined')
    return (
      <main className="container text-center">
        <h1>Loading...</h1>
      </main>
    );
  } else if (login) {
    console.log('main')
    return <Main allBooks={allBooks} allUsers={allUsers} />;
  }
  
  console.log('login')
  return (
    <React.Fragment>
        <Header />
        <Login />
    </React.Fragment>

  );

}

export default App;
