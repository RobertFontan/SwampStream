import React from 'react'
import Video from './Video'
import { useEffect, useState } from 'react'

import axios from 'axios'

function Course({course}) {

  const [videos, setVideos] = useState(null)

  const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  const fetchURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${course.playlistID}&key=${API_KEY}`



  const fetchData = async () => {
    const response = await axios.get(fetchURL)
    console.log('response', response)
    // console.log('videos', response.data.items)
    setVideos(response.data.items)
    
  }

  



  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
    {videos && <div className='course'>
        <h1>{course.title}</h1>
        <div className="course-videos">{course.videos.filter((item, index) => index < 4).map(vid => <Video video={vid} />)}</div>
    </div>
  )
}

export default Course