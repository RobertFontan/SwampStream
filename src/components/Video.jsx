import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Video({video}) {
  console.log(video.snippet)
  const [videoData, setVideoData] = useState(null)

  useEffect(() => {
    setVideoData(video.snippet)
    console.log(videoData)
  }, [])

  // for explore videos 
  if(!videoData){
    return (
      <Link to={"/watching/" + video.videoID}>
        <div className='video'>
          <img src={video.thumbnail} alt="Thumbnail for selected video" />
          <p>{video.title}</p>
        </div>
      </Link>
    )
  }
  
  return (
    <>
    {videoData && <Link to={"/watching/" + videoData.resourceId.videoId}>
      <div className='video'>
          <img src={videoData.thumbnails.medium.url} alt="Thumbnail for selected video" />
          <p>{videoData.title}</p>
      </div>
    </Link>}
    </>
  )
  
}

export default Video