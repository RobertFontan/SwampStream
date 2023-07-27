import React, { useEffect, useState, useRef} from 'react'
import Youtube from 'react-youtube'

/* Components */
import Comment from '../components/Comment';
import NavBar from '../components/Navbar';
import NotesSidebar from '../components/NotesSidebar';
import Transcript from '../components/Transcript';
import DownloadComponent from '../components/DownloadComponent';

/* Routing */
import { useParams } from 'react-router-dom';

/* API/Database */
import axios from 'axios';

import supabase from '../config/supabaseClient';

/* Bootstrap */
import {Container, Row, Col, Accordion,  Button} from 'react-bootstrap';



function Watching() {
  // what should happen when watching is clicked ? 

  const {videoID} = useParams()

  const [videoData, setVideoData] = useState(null)
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
    const {data, error} = await axios.get(fetchURL)
    console.log('made it here')
    if(data){
      console.log('watching data', data.items[0].snippet)
      setVideoData(data.items[0].snippet)
      setTitle(data.items[0].snippet.title)
      setDescription(data.items[0].snippet.description)
    }
    if(error){
      console.log('watching error', error)
    }
    
    // console.log('watching data', response.data.items[0])
    // setVideoData(response.data.items[0])

    // setTitle(videoData.snippet.title)
    // setDescription(videoData.snippet.description)
    

  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleClick = (component) => {
    setSidebar(component);
  };

  // send video object to database
  const handleVideoSave = async () => {
    
    // this sends video to database 
    const {data, error} = await supabase
    .from('Saved')
    .insert({ 'videoId': videoID, 'title': title, 'thumbnail': videoData.thumbnails.medium.url })
    
    if(data){
      console.log(data)
    }
    if(error){
      alert('Already saved (this will be updated :p)')
      console.log('error', error)
    }
  }

  /* TIMESTAMP */

  const playerRef = useRef()
  const onReady = (e) =>{
    playerRef.current = e.target
  }

  // maybe send to save data base
  const timeStampClick = (seconds) =>{
    
    if(playerRef.current){
      playerRef.current.seekTo(seconds)
    }
  }


  return (  
    <>
    <Container fluid className='watching'>
      <Row>
      <Col lg={6} className="left-screen">
        
        <div className="video-player">
          <div className="header">
            <h6>{title}</h6>
            <DownloadComponent videoId={videoID} />
            <Button onClick={handleVideoSave}>Save Video</Button>
          </div>
          <Youtube videoId={videoID} opts={opts} onReady={onReady} />
        </div>        
        <Accordion flush>
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
        <Col  className='right-screen'>
          <div className="button-container">
            <Button className={sidebar === "notes" ? "active": ""} onClick={()=> handleClick("notes")}>Notes</Button>
            <Button className={sidebar === "transcript" ? "active": ""} onClick={() => handleClick("transcript")}>Transcript</Button>
          </div>
          <div className="sidebar">
            {sidebar === "transcript" ? <Transcript videoId={videoID}/>: <NotesSidebar pRef={playerRef}title={title} videoId={videoID} />}
          </div>
        </Col>
      </Row>
    </Container>
    </>
     
  )
}

export default Watching