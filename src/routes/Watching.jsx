import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
//import comments from '../data/comments';

import Comment from '../components/Comment';
import NotesSidebar from '../components/NotesSidebar';


import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'


function Watching() {
  // what should happen when watching is clicked ? 

  const {videoID} = useParams()
  const [description, setDescription] = useState(null)

  const [open, setOpen] = useState(false)

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
    setDescription(response.data.items[0].snippet.description)
    
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='watching'>
      <div className="left-screen">
        <div className="video-player"><Youtube videoId={videoID} opts={opts} onReady={(e) => e.target.pauseVideo()} /></div>
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
      </div>
      <div className='right-screen'>
        <div className="sidebar">
          <NotesSidebar videoId={videoID}/>
        </div>
      </div>
    
    </div>
  )
}

export default Watching