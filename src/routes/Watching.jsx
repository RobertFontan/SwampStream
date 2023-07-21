import React, { useEffect, useState, useRef} from 'react'
import Youtube from 'react-youtube'

/* Components */
import Comment from '../components/Comment';
import NavBar from '../components/Navbar';
import NotesSidebar from '../components/NotesSidebar';
import Transcript from '../components/Transcript';
import DownloadComponent from '../components/DownloadComponent';

import { useParams } from 'react-router-dom';
import axios from 'axios';

/* Bootstrap */
import {Container, Row, Col, Accordion,  Button} from 'react-bootstrap';



function Watching() {
  // what should happen when watching is clicked ? 

  const {videoID} = useParams()
  const [description, setDescription] = useState(null)
  const [title, setTitle] = useState(null)
  const [sidebar, setSidebar] = useState("notes")
  

  
  
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  const fetchURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${API_KEY}`

  const fetchData = async () => {
    const response = await axios.get(fetchURL)
    
    
    setTitle(response.data.items[0].snippet.title)
    setDescription(response.data.items[0].snippet.description)
    
    console.log('watching',response.data)

  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleClick = (component) => {
    setSidebar(component);
  };

  return (  
    <>
    <Container fluid className='watching'>
      <Row>
      <Col lg={2}>
        <NavBar/>
      </Col>
      <Col lg={6} className="left-screen">
        
        <div className="video-player">
          <div className="header">
            <h6>{title}</h6>
            <DownloadComponent videoId={videoID}/>
          </div>
          <Youtube videoId={videoID} opts={opts} onReady={(e) => e.target.pauseVideo()} />
        </div>
        
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>{description && <div id="description">{description}</div>}</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='1'>
            <Accordion.Header>Commments</Accordion.Header>
            <Accordion.Body><Comment videoId={videoID} /></Accordion.Body>
          </Accordion.Item>

        </Accordion>      
      </Col>
      <Col lg={2} className='right-screen'>
        <Button onClick={()=> handleClick("notes")}>Notes</Button><Button onClick={() => handleClick("transcript")}>Transcript</Button>
        <div className="sidebar">
          {sidebar === "transcript" ? <Transcript videoId={videoID}/>: <NotesSidebar title={title} videoId={videoID} />}
        </div>
      </Col>

      {/* <VideoPlayer />
      <Comments />
      <SideBar /> */}
      
      </Row>
    </Container>
    </>
     
  )
}

export default Watching