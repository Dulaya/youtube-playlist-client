import React from 'react';

import { Container, Col, ListGroup, Button } from 'react-bootstrap';
import { FaGithubAlt } from 'react-icons/fa';

const About = () => {

    //Open New Tab
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    return (
        <Container >
            <Col sm='12' md='8' lg='6' style={{ margin: '10px auto', }}>
                <ListGroup  >
                    <ListGroup.Item
                        style={{
                            color: 'white',
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% )`
                        }}>About</ListGroup.Item>
                    <ListGroup.Item style={{
                        textAlign: 'center',
                    }}>
                        <p style={{ textAlign: 'left' }}>
                            YouTube Playlist is a web app for creating playlists of YouTube videos.
                            Users are allowed to create accounts, login and upload YouTube video links.
                            Users may also upload pictures associated with the videos.
                        </p>
                        <p style={{ textAlign: 'left' }}>
                            This web app was created by Dulaya Saennok using the MERN stack.
                            Source code can be found on GitHub.
                        </p>
                        <Button variant='outline-dark' style={{ margin: '5px' }} onClick={() => openInNewTab('https://github.com/Dulaya/youtube-playlist-client')}>
                            <FaGithubAlt /> Client
                        </Button>
                        <Button variant='outline-dark' style={{}} onClick={() => openInNewTab('https://github.com/Dulaya/youtube-playlist-server')}>
                            <FaGithubAlt /> Server
                        </Button>
                    </ListGroup.Item>



                </ListGroup>
            </Col>

        </Container >
    );
}

export default About;