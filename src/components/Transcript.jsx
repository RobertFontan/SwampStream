import React, { useState, useEffect } from 'react'
import {YoutubeTranscript} from 'youtube-transcript'
import { Spinner } from 'react-bootstrap'
import supabase from '../config/supabaseClient'

import axios from 'axios'
function Transcript({videoId}) {
  const [transcript, setTranscript] = useState(null)


  const fetchTranscriptData = async () => {
    console.log('fetching transcript data')
    const options = {
      method: 'GET',
      url: 'https://youtube-captions.p.rapidapi.com/create-transcript',
      params: {
        videoUrl: 'https://www.youtube.com/watch?v=' + videoId
      },
      headers: {
        'X-RapidAPI-Key': '3bbf868d53msh78af357de335f9ap1536a6jsn20da07fcbe43',
        'X-RapidAPI-Host': 'youtube-captions.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    setTranscript(response.data) // text transcript
    // update supabase
    handleUpdate()


  }

  const handleUpdate = async () => {
    console.log('going to update')
    const {data, error} = await supabase
    .from('Notes')
    .update({'transcript': transcript})
    .eq('videoId', videoId)
    if(data){
      console.log('update successful')
    }


  }


  const fetchDatabaseData = async () => {
    const { data, error } = await supabase
    .from('Notes')
    .select('transcript')
    .eq('videoId', videoId)
    .single()
    
    if (data) {
      console.log('tdata', data)
      if(data.transcript == null){
        console.log('data is null')
        fetchTranscriptData()
      }
      else{
        setTranscript(data.transcript)

      }
      
    }
    if(error){
      console.error('tdataerror', error)
    }
  }

  useEffect(() => {
    fetchDatabaseData() 
  }, [])
  

  if(!transcript){
    return(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div>{transcript && <p>{transcript}</p>}</div>
  )
}

export default Transcript