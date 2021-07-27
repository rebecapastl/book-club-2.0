import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Books from '../pages/Books';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import BookDetails from '../components/BookDetails';
import UserDetails from '../components/UserDetails';
import '../css/app.css'
import {
//   BrowserRouter as Router,
  Router,
  Switch,
  Route,
} from "react-router-dom";

// Analytics
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

// Analytics
// initialize ReactGA
const trackingId = "UA-202922252-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

// set up history object
const history = createBrowserHistory();

// Initialize google analytics page view tracking
// history event listener, add it to the Router component
history.listen(location => {
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

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

function Main(props: { allUsers: User[]; allBooks: Book[] }){

    return (
        <Router history={history}>
        <main className='bg-dark'>
            <Header />
            <Navbar />
            <div className='main-wrapper'>
                <Switch>
                    <Route path="/books" component={Books} />
                    <Route path="/details" component={BookDetails} />
                    <Route path="/users" component={Users} />
                    <Route path="/userDetails" component={UserDetails} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
            <Footer />
        </main>
        </Router>

    )

}

export default Main;