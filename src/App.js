import React, { useState, } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { CardGroup, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { AiOutlineMenu, AiOutlineLogin, AiOutlineFileDone } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';

import Collage from './Image/collage.jpg';
import Rocket from './Image/rocket.svg';
import UserContext from './context/UserContext';
import Demo from './components/Demo';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import About from './components/About';

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
          position: 'sticky',
          top: '0',
          zIndex: '99999'
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
                    <Link style={linkStyle} to='/demo'>Demo</Link>
                    <Link style={linkStyle} to='/login'>Login</Link>
                    <Link style={linkStyle} to='/register'>Register</Link>
                    <Link style={linkStyle} to='/about'>About</Link>
                  </> :
                  <Link style={linkStyle} to={`/${currentUser}`} >
                    {currentUser}'s Playlist
                   </Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path='/demo'>
            <Demo />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/about'>
            <About />
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
            overflowY: 'hidden',
            position: 'fixed',
            backgroundSize: '100vh',
          }}></div>

          {
            //Only render User page if token exists.
            currentToken ? <></> :
              <CardGroup style={{ margin: '25vh 15vw', }}>
                <Card
                  style={{
                    borderRadius: '10px',
                    margin: '10px',
                    color: 'white',
                    backgroundImage: `linear-gradient( 108.3deg,  rgba(202,73,118,1) 15.2%, rgba(255,84,84,1) 99.3% )`,
                  }}>
                  <Link to='/demo' style={{ color: 'white', textDecoration: 'none' }}>
                    <Card.Title style={{ textAlign: 'center' }}>Demo</Card.Title>
                    <BsEye style={{ width: '100%', height: '100%', maxHeight: '150px', margin: 'auto' }} />
                    <Card.Text style={{ margin: '5px auto', textAlign: 'center' }}>
                      Take a look the app before signing up.
             </Card.Text>
                  </Link>
                </Card>
                <Card style={{
                  borderRadius: '10px',
                  margin: '10px',
                  color: 'white',
                  backgroundImage: `linear-gradient( 107deg,  rgba(13,198,180,1) 8.1%, rgba(33,198,138,1) 79.5% )`,

                }}>
                  <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>
                    <Card.Title style={{ textAlign: 'center' }}>Register</Card.Title>
                    <AiOutlineFileDone style={{ width: '100%', height: '100%', maxHeight: '150px', margin: 'auto' }} />
                    <Card.Text style={{ margin: '5px auto', textAlign: 'center' }}>
                      Don't have an account? Signup Here.
             </Card.Text>
                  </Link>
                </Card>
                <Card style={{
                  borderRadius: '10px',
                  color: 'white',
                  height: '100%',
                  margin: '10px',
                  padding: '10px',
                  backgroundImage: `linear-gradient( 111.5deg, rgba(20,100,196,1) 0.4%, rgba(33,152,214,1) 100.2% )`
                }}>
                  <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>
                    <Card.Title style={{ textAlign: 'center' }}>Login</Card.Title>
                    <AiOutlineLogin style={{ width: '100%', height: '100%', maxHeight: '150px', margin: 'auto' }} />
                    <Card.Text style={{ margin: '5px auto', textAlign: 'center' }}>
                      Already have an account? Signin Here.
             </Card.Text>
                  </Link>
                </Card>
              </CardGroup>
          }

        </Route>

      </Router >
    </UserContext.Provider >
  );
}

export default App;
