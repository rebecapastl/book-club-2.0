import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';
import Books from './pages/Books';
import Users from './pages/Users';

const allUsers: any = [];
const allBooks: any = [];

test('renders welcome message', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Welcome to the Book Club/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders books page', () => {
  render(<Books allBooks={allBooks}/>);
  const linkElement = screen.getByText(/Available books/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders users page', () => {
  render(<Users  allUsers={allUsers} />);
  const linkElement = screen.getByText(/Book Club users/i);
  expect(linkElement).toBeInTheDocument();
});

