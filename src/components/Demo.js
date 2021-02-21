import React, { useState, } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import YouTube from 'react-youtube';

import { Container, Row, Col, Form, ListGroup, Button, OverlayTrigger, Popover } from 'react-bootstrap';

import MJ from '../Image/mj.jpg';
import JohnnyCash from '../Image/Johnny.jpg';
import U2 from '../Image/U2.jpeg';
import Monk from '../Image/monk.jpg';
import SouthBeach from '../Image/SouthBeach.jpg';
import Gump from '../Image/gump.jpg';
import Forged from '../Image/forged.jpg';
import Interstellar from '../Image/Interstellar.jpg';
import Terminator from '../Image/Terminator.jpg';
import Queen from '../Image/queen.jpg';
import Creedence from '../Image/Creedence.jpg';
import Billy from '../Image/Billy.jpg';

const columnStyle = {
    float: 'left',
    maxWidth: '400px',
    margin: '10px auto',
}

const tagStyle = {
    border: '1px solid',
    margin: '2.5px',
}

const Demo = () => {
    const [currentVideo, setCurrentVideo] = useState();

    const content = [
        {
            selectedFile: MJ,
            youTubeLink: 'Zi_XLOBDo_Y'
        },
        {
            selectedFile: JohnnyCash,
            youTubeLink: 'J-6fW66IUY4'
        },
        {
            selectedFile: U2,
            youTubeLink: 'GzZWSrr5wFI'
        },
        {
            selectedFile: Monk,
            youTubeLink: '64BflJXEUg8'
        },
        {
            selectedFile: SouthBeach,
            youTubeLink: 'Vg3YM6Uv_dg'
        },
        {
            selectedFile: Gump,
            youTubeLink: '4rT5fYMfEUc'
        },
        {
            selectedFile: Forged,
            youTubeLink: 'qKpMcEW2j4g'
        },
        {
            selectedFile: Interstellar,
            youTubeLink: '2LqzF5WauAw'
        },
        {
            selectedFile: Terminator,
            youTubeLink: '6ba1F7MVO7M'
        },
        {
            selectedFile: Queen,
            youTubeLink: 'fJ9rUzIMcZQ'
        },
        {
            selectedFile: Creedence,
            youTubeLink: 'Gu2pVPWGYMQ'
        },
        {
            selectedFile: Billy,
            youTubeLink: 'gxEPV4kolz0'
        },
    ];

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Demo Only</Popover.Title>
            <Popover.Content>
                Register an account and login in order to create a playlist.
            </Popover.Content>
        </Popover>
    );

    const Submit = () => (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button style={{
                background: `linear-gradient(25deg,#1f57db,#3483e3 50%)`,
                border: 'none',
            }}
            >
                Submit
            </Button>
        </OverlayTrigger>
    );

    const popoverLogout = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Demo Only</Popover.Title>
            <Popover.Content>
                Register an account and login in order to logout.
            </Popover.Content>
        </Popover>
    );

    const Logout = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverLogout}>
            <Button variant='outline-light' style={{ margin: '0 5px' }} >Logout</Button>
        </OverlayTrigger>
    );

    const popoverDeleteAccount = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Demo Only</Popover.Title>
            <Popover.Content>
                Register an account and login in order to Delete Account.
            </Popover.Content>
        </Popover>
    );

    const DeleteAccount = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDeleteAccount}>
            <Button variant='outline-light' >Delete Account</Button>
        </OverlayTrigger>
    );

    const popoverDeletePlaylist = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Demo Only</Popover.Title>
            <Popover.Content>
                Register an account and login in order to delete a playlist.
            </Popover.Content>
        </Popover>
    );

    const DeletePlaylist = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDeletePlaylist}>
            <Button style={{ background: 'none', border: 'none' }}>❌</Button>
        </OverlayTrigger>
    );

    return (
        <Router>
            <Container >

                <ListGroup style={{
                    margin: '10px 0',
                }}>
                    <ListGroup.Item style={{
                        background: `linear-gradient(25deg,#1f57db,#3483e3 50%)`,
                        color: 'white',
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>Hi, Demo!</span>
                        <span style={{ float: 'right' }}>
                            <Logout />
                            <DeleteAccount />
                        </span>
                    </ListGroup.Item>
                </ListGroup>

                <Col sm='12' md='4' lg='2' style={columnStyle}>

                    <Form onSubmit={e => e.preventDefault()}>
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
                                <Submit />
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                </Col>

                <Col sm='12' md='4' lg='8' style={columnStyle}>
                    <YouTube videoId={currentVideo ? currentVideo : content[0].youTubeLink} />
                </Col>

                <Col sm='12' md='8' lg='12' style={/*columnStyle*/{
                    margin: 'auto',
                    float: 'left',
                }}>

                    <Row>
                        {
                            content.map(picture =>
                                <Col key={picture.youTubeLink} style={{ textAlign: 'center' }} >
                                    <span
                                        style={{ cursor: 'pointer', position: 'absolute' }}
                                    >
                                        <DeletePlaylist />
                                    </span>
                                    <img
                                        src={picture.selectedFile}
                                        style={{ borderRadius: '10px', height: '150px', margin: '5px' }}
                                        onClick={() => setCurrentVideo(picture.youTubeLink)}
                                    />
                                </Col>
                            )
                        }
                    </Row>
                </Col>

            </Container>
        </Router>
    );

}

export default Demo;