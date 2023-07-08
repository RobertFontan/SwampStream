import React from 'react'


function Video({video}) {
  
  return (
    
    <div className='video'>
        <img src={video.thumbnail} alt="Thumbnail for selected video" />
        <p>{video.title}</p>
    </div>
  )
  
}

export default Video