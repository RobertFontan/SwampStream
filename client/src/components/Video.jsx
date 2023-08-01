import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Video({course, video}) {
  console.log(video.snippet)
  const [videoData, setVideoData] = useState(null)

  useEffect(() => {
    setVideoData(video.snippet)
    //console.log(videoData)
  }, [])

  /* Explore, Saved Videos (anything in database) */
  if(!videoData){
    return (
      <Link to={"/watching/" + course + "/" + video.videoID}>
        <div className='video'>
          <img src={video.thumbnail} alt="Thumbnail for selected video" />
          <p>{video.title}</p>
        </div>
      </Link>
    )
  }
  /* anything in playlist */
  return (
    <>
    {videoData && <Link to={"/watching/" + course + "/"+ videoData.resourceId.videoId}>
      <div className='video'>
          <img src={videoData.thumbnails.medium.url} alt="Thumbnail for selected video" />
          <p>{videoData.title}</p>
      </div>
    </Link>}
    </>
  )
  
}

export default Video