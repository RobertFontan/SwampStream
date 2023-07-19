import React, { useState, useEffect } from 'react'
import {YoutubeTranscript} from 'youtube-transcript'

import axios from 'axios'
function Transcript({videoId}) {
  // const [transcript, setTranscript] = useState(null)


  // const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  // const fetchURL = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(fetchURL)
  //     console.log('transcript', response)
  //   }
  //   fetchData()
  // }, [])

  
  // man what
  return (
    <div>Transcript</div>
  )
}

export default Transcript