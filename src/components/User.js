import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FileBase from 'react-file-base64';
import YouTube from 'react-youtube';

import { Navbar, Container, Row, Col, Form, ListGroup, Button, Modal, Spinner } from 'react-bootstrap';

import UserContext from '../context/UserContext';
import { getPostsURL, createPostURL, deleteAccountURL, deletePostURL } from '../urls';

const columnStyle = {
    float: 'left',
    maxWidth: '400px',
    margin: '10px auto',
}

const tagStyle = {
    border: '1px solid',
    margin: '2.5px',
}

const User = () => {

    const [user, setUser] = useState();
    const [content, setContent] = useState([]);
    const [currentVideo, setCurrentVideo] = useState();
    const [loadingStatus, setloadingStatus] = useState(false);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);


    //Only use for ease of handling file upload.
    //setTempFile will set the uploaded picture as tempFile.
    //tempFile is sent to database via POST in the body
    const [tempFile, setTempFile] = useState();

    let history = useHistory();

    const { currentToken, setCurrentToken, currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(async () => {
        //Need mountin/unmounting otherwise setContent in useEffect will result in memory error
        let unmounted = false;

        try {
            //Requests all the posts by current user
            const { data } = await axios.get(getPostsURL, { headers: { 'auth-token': currentToken } });
            if (!unmounted) {
                setUser(currentUser);
                setloadingStatus(true);
                setContent(data);
                if (data.length > 0) setCurrentVideo(data[0].youTubeLink);
            }
        } catch (error) {
            console.log(error);
        }

        //Clean up function to prevent memory leak.
        return () => {
            unmounted = true;
            setloadingStatus(false);
        }
    }
        , []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (document.getElementById('youTubeLink').value.includes('youtube.com/watch?v=')) {

            //Accepts YouTube link and return YouTube id
            //i.e. https://www.youtube.com/watch?v=Zi_XLOBDo_Y --> Zi_XLOBDo_Y
            const getYouTubeId = (link) => {
                var [youTubeId, concatString] = ['', false];

                for (var i = 0; i < link.length; i++) {
                    if (concatString === true) youTubeId += link[i];
                    if (link[i] === '=') concatString = true;
                }

                return youTubeId;
            }

            try {

                setUploadingStatus(true);

                //Send data to databse
                //Important: When sending token in post request, 1st parameter is URL, 2nd is body, 3rd is header (order matters)
                const { data } = await axios.post(createPostURL,
                    {
                        post: document.getElementById('post').value,
                        selectedFile: tempFile,
                        userID: jwt_decode(currentToken).data._id,
                        youTubeLink: getYouTubeId(document.getElementById('youTubeLink').value),
                    },
                    {
                        headers:
                        {
                            'auth-token': currentToken
                        }
                    }
                );

                //Change state (local) according to data returned from database
                setContent([...content, data.savedPost]);
            } catch (error) {
                console.log(error);
            }

            setUploadingStatus(false);

        } else alert('Invalid YouTube Link');
    }

    const handleLogOut = () => {
        //Remove token from local storage and clear states
        localStorage.removeItem('userToken');
        setCurrentToken('')
        setCurrentUser('');

        //Redirect to homepage
        history.push('/');
    }

    const deleteAccount = () => {
        //Ask for permission before making POST request to delete account
        if (window.confirm('Are you sure? This will delete your account and posts from the database permanently.')) {
            try {
                //Sending POST request to delete account
                //Note axios.delete only accept 2 parameters
                axios.delete(deleteAccountURL, { headers: { 'auth-token': currentToken } });

                handleLogOut();

                //Redirect to homepage
                history.push('/');

            } catch (error) {
                console.log(error);
            }
        }
    }

    const deletePlaylist = async (postID) => {

        try {
            setDeletingStatus(true);

            //Important: send data in this format for axios.delete
            const { data } = await axios.delete(
                deletePostURL,
                {
                    headers: { 'auth-token': currentToken },
                    data: { postID: postID }
                });

            //Delete post from local if id matches 
            setContent(content.filter(post => post._id !== data.postID));

        } catch (error) {
            console.log(error);
        }

        setDeletingStatus(false);

    }

    return (
        <>
            {
                //Check if token expire. If so, log out.
                jwt_decode(currentToken).exp > Date.now() / 1000 ?
                    <Router>
                        <Container >

                            <ListGroup style={{
                                margin: '10px 0',
                            }}>
                                <ListGroup.Item style={{
                                    background: `linear-gradient(25deg,#1f57db,#3483e3 50%)`,
                                    color: 'white',
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>Hi, {user}!</span>
                                    <span style={{ float: 'right' }}>
                                        <Link to='/'>
                                            <Button onClick={handleLogOut} variant='outline-light' style={{ margin: '0 5px' }}>Log Out</Button>
                                        </Link>
                                        <Button onClick={deleteAccount} variant='outline-light' >Delete Account</Button>
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>

                            <Col sm='12' md='4' lg='2' style={columnStyle}>

                                <Form onSubmit={handleSubmit}>
                                    <ListGroup>
                                        <ListGroup.Item style={{
                                            background: `linear-gradient(25deg,#1f57db,#3483e3 50%)`,
                                            color: 'white',
                                            fontSize: '1.25rem',
                                            textAlign: 'center',
                                        }}>
                                            <Form.Label>Create A New Playlist</Form.Label>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Form.Control id='post' placeholder="Video Name" />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <FileBase
                                                id='file'
                                                type="file"
                                                multiple={false}
                                                onDone={({ base64 }) => setTempFile(base64)}
                                            />
                                            <Form.Text className="text-muted">
                                                Choose a photo representing your video (5MB max)
                                        </Form.Text>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Form.Control id='youTubeLink' placeholder="YouTube Link" />
                                            <Form.Text className="text-muted">
                                                https://www.youtube.com/watch?v=Zi_XLOBDo_Y
                                        </Form.Text>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button type="submit" style={{
                                                background: `linear-gradient(25deg,#1f57db,#3483e3 50%)`,
                                                border: 'none',
                                            }}>Submit</Button>
                                            {
                                                uploadingStatus ? <Spinner animation="border" role="status" /> : <></>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Form>
                            </Col>

                            <Col sm='12' md='4' lg='8' style={columnStyle}>
                                <YouTube videoId={currentVideo ? currentVideo : 'Zi_XLOBDo_Y'} />
                            </Col>

                            <Col sm='12' md='8' lg='12' style={/*columnStyle*/{
                                margin: 'auto',
                                float: 'left',
                            }}>
                                {
                                    loadingStatus ? <Row >
                                        {
                                            content.map(picture =>
                                                <Col key={picture._id} style={{ textAlign: 'center' }} >
                                                    <span
                                                        onClick={() => deletePlaylist(picture._id)}
                                                        style={{ cursor: 'pointer', position: 'absolute' }}
                                                    >
                                                        ❌
                                            </span>
                                                    <img
                                                        src={picture.selectedFile}
                                                        style={{ borderRadius: '10px', height: '150px', margin: '5px' }}
                                                        onClick={() => setCurrentVideo(picture.youTubeLink)}
                                                    />
                                                </Col>
                                            )
                                        }
                                        {
                                            deletingStatus ? <>Deleting<Spinner animation="border" role="status" /></> : <></>
                                        }
                                    </Row> : <Col style={{ textAlign: 'center' }}><Spinner animation="border" role="status" /> Loading Content</Col>
                                }
                            </Col>

                        </Container>

                    </Router>
                    : <>
                        {
                            //Logout if token expires
                            handleLogOut()
                        }
                    </>
            }
        </>
    );

}

export default User;