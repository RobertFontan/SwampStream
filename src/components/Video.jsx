import React from 'react'
import { Link } from 'react-router-dom'

function Video({video}) {
  
  console.log('selected videoID', video.videoID)

  return (
    
    <Link to={"/watching/" + video.videoID} onClick={video.visited = true}>
      <div className='video'>
          <img src={video.thumbnail} alt="Thumbnail for selected video" />
          <p>{video.title}</p>
      </div>
    </Link>
  )
  
}

export default Video