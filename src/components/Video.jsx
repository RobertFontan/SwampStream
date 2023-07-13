import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Video({video}) {
  console.log(video.snippet)
  const [videoData, setVideoData] = useState(null)
  // console.log('videoData' , videoData)

  useEffect(() => {
    setVideoData(video.snippet)
    console.log(videoData)
  }, [])
  
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