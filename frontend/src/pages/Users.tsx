import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { NavLink } from 'react-router-dom';

//create interface to establish the User type format
interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
};

function Users(props: { allUsers: User[] }){

  const allUsers = props.allUsers;

    //all users
    const usersCols = allUsers.map((user: User, index: number) => 
        <Col key={index} className="m-5 text-center">
            <NavLink 
                className='hover-effect text-yellow mx-3 my-auto p-2 text-decoration-none' 
                to={{
                    pathname:`/user/${user._id}`,
                    state: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar,
                        }
                    }}
            >     
            <Image 
              src={user.avatar} 
              width={171}
              height={180}
              alt={user.name}
              roundedCircle 
            />
            <p className='h3 my-3 text-yellow'>{user.name}</p>
          </NavLink>
        </Col>
    
    );

  return(
    <React.Fragment>
      <h2 className='montserrat-alternate text-yellow text-center'>Book Club users</h2>            
      <Row xs={1} md={4} className='m-5'>
        {usersCols}
      </Row>
    </React.Fragment>  
  );
}

export default Users;