import React, { useState, } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';

import { Navbar, Nav, Button } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';

import Collage from './Image/collage.jpg';
import UserContext from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';

const linkStyle = {
  color: 'white',
  fontSize: '1.25rem',
  margin: '5px',
}

function App() {
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('userToken'));
  const [currentUser, setCurrentUser] = useState(
    //If token exist, set currentUser as userName. Else, set as empty string.
    currentToken ? jwt_decode(currentToken).data.userName : ''
  );

  return (
    <UserContext.Provider value={{ currentToken, setCurrentToken, currentUser, setCurrentUser }}>
      <Router>
        <Navbar expand="lg" style={{
          background: `linear-gradient(25deg,#d64c7f,#ee4758 50%)`,
          color: 'white',
        }}>
          <Navbar.Brand >
            <Link style={{ color: 'white' }} to='/'>Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: 'white' }}>
            <AiOutlineMenu />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto" >
              {
                //Show Login and Register links if token exists.
                //Show Playlist link if token exists.
                !currentToken ?
                  <>
                    <Link style={linkStyle} to='/login'>Login</Link>
                    <Link style={linkStyle} to='/register'>Register</Link>
                  </> :
                  <Link style={linkStyle} to={`/${currentUser}`} >
                    {currentUser}'s Playlist
                   </Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>

          {
            //Only render User page if token exists.
            currentToken ?
              <Route exact path={`/${currentUser}`}>
                <User />
              </Route> : <></>
          }
        </Switch>

        <Route exact path='/'>
          <div style={{
            background: `url(${Collage})`,
            width: '100vw',
            height: '100vh',
            backgroundSize: '100vh',
          }}></div>
        </Route>
      </Router >

    </UserContext.Provider >
  );
}

export default App;
