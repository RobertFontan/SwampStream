import React, {useState, useEffect, useRef } from 'react'

// import { Button, Overlay } from 'react-bootstrap'

import supabase from '../config/supabaseClient';

import {Button, Overlay, ListGroup, Offcanvas} from 'react-bootstrap'
import axios from 'axios';

function DownloadComponent({videoId}) {
  console.log('videoId', videoId)
  /* List Group logic*/
  const [show, setShow] = useState(false);
  const target = useRef(null);

  /* Offcanvas */
  const [offShow, setOffShow] = useState(false)

  const handleOffClose = () => setOffShow(false)
  const handleOffShow = () => setOffShow(true)

  /* Download Logic */
  const [fileType, setFileType] = useState(null)
  const [result, setResult] = useState(null)

  const fetchAudioData = async () => {
    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': '3bbf868d53msh78af357de335f9ap1536a6jsn20da07fcbe43',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: videoId
      }
    }
    const response = await axios.request(options);

    console.log(response.data);
    setResult(response.data.link)
    handleOffShow()
  }
  //         {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}

  const fetchVideoData = async () => {
    // console.log('videodata videoid', videoId)
    // const options = {
    //   method: 'GET',
    //   url: 'https://youtube-video-download-info.p.rapidapi.com/dl',
    //   params: {id: videoId},
    //   headers: {
    //     'X-RapidAPI-Key': '3bbf868d53msh78af357de335f9ap1536a6jsn20da07fcbe43',
    //     'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
    //   }
    // };
    // const response = await axios.request(options);
    // console.log(response.data.link)

    console.log('not working')
  }

  const fetchTranscriptData = async () => {
    const { data, error } = await supabase
    .from('Notes')
    .select('transcript')
    .eq('videoId', videoId)
    .single()

    console.log('dtData', data)
    if(data){
      console.log('dData', data.transcript)
      setResult(data.transcript)
      handleOffShow()
    }
    if(error){
      console.error('err', error)
    }
  }
  

  const handleDownload = async (e) => {
    console.log('download clicked')
    const fileType = e.target.id
    console.log('ftype',fileType)
    if (fileType == 'mp3'){
      fetchAudioData()
    }
    else if (fileType == 'mp4'){
      fetchVideoData()
    }
    else if (fileType == 'text'){
      fetchTranscriptData()
    } 
    else{
      console.log('unknown', fileType)
    }  
  }

  
  return (
    <div>
        <Button variant="danger" ref={target} onClick={() => setShow(!show)}>Download</Button>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <ListGroup {...props}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 100, 100, 0.85)',
            padding: '2px 10px',
            color: 'white',
            borderRadius: 3,
            ...props.style,
          }}>
            <ListGroup.Item onClick={handleDownload} id='mp4'>Video</ListGroup.Item>
            <ListGroup.Item onClick={handleDownload} id='mp3'>Audio</ListGroup.Item>
            <ListGroup.Item onClick={handleDownload} id='text'>Transcript</ListGroup.Item>
          </ListGroup>
        )}
      </Overlay>

      <Offcanvas show={offShow} onHide={handleOffClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {result}
          {/* {result ? <a target='_blank' rel="noreferrer" href={result} className="download_btn">{fileType} Download Ready </a> : <p>error</p>} */}
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}

export default DownloadComponent