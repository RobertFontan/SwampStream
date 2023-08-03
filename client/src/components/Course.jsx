import React from 'react'
import Video from './Video'
import { useEffect, useState } from 'react'

import { Spinner } from 'react-bootstrap'

import axios from 'axios'

function Course({course}) {

  const [videos, setVideos] = useState(null)

  const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  const fetchURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${course.playlistID}&key=${API_KEY}`



  const fetchData = async () => {
    const response = await axios.get(fetchURL)
    //console.log('response', response)
    console.log('videos', response.data.items)
    setVideos(response.data.items)
    
  }

  
  useEffect(() => {
    fetchData()
  }, [])
  
  // if(videos == null){
  //   return(
  //     <Spinner animation="border" role="status">
  //       <span >Loading...</span>
  //     </Spinner>
  //   )
    
  // }

  if (!videos){
    return(
      <div>
        <Spinner animation="border" role="status"></Spinner>
      </div>
    )
  }
  return (
    <>
    {videos && <div className='course'>
        <h1>{course.title}</h1>
        <div className="course-videos">{videos.filter((item, index) => index < 11).map(vid => <Video course={course.title.slice(0,7)} video={vid} />)}</div>
    </div>
    }
    </>
  )
}

export default Course