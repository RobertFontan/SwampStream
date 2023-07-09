import React from 'react'
import { Link } from 'react-router-dom'

function Video({video}) {
  
  return (
    
    <Link to="/watching">
      <div className='video'>
          <img src={video.thumbnail} alt="Thumbnail for selected video" />
          <p>{video.title}</p>
      </div>
    </Link>
  )
  
}

export default Video