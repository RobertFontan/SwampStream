import React, {useState, useEffect, useRef } from 'react'

// import { Button, Overlay } from 'react-bootstrap'

import {Button, Overlay, ListGroup} from 'react-bootstrap'



function DownloadComponent({videoID}) {
  /* List Group logic*/
  const [show, setShow] = useState(false);
  const target = useRef(null);

  /* Download Logic */
  const [fileType, setFileType] = useState('mp3')

  const videoURL = 'https://www.youtube.com/watch?v=' + videoID
  const fetchURL = `https://convert2mp3s.com/api/button/${fileType}?url=${videoURL}`

  //https://github.com/matthew-asuncion/Fast-YouTube-to-MP3-Converter-API
  
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
            <ListGroup.Item>Video</ListGroup.Item>
            <ListGroup.Item>Audio</ListGroup.Item>
            <ListGroup.Item>Transcript</ListGroup.Item>
          </ListGroup>
        )}
      </Overlay>

    </div>
  )
}

export default DownloadComponent