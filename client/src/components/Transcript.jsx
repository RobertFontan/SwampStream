import React, { useState, useEffect } from 'react'
import {YoutubeTranscript} from 'youtube-transcript'
import { Spinner } from 'react-bootstrap'
import supabase from '../config/supabaseClient'

import {Dropdown} from 'react-bootstrap'

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
    console.log('going to update', transcript)
    const {data, error} = await supabase
    .from('Notes')
    .insert({'transcript': transcript})
    .eq('videoId', videoId)
    if(data){
      console.log('update successful')
    }
    if(error){
      console.log('err', error)
    }
    console.log('update done')
  }


  const fetchDatabaseData = async () => {
    const { data, error } = await supabase
    .from('Notes')
    .select('transcript')
    .eq('videoId', videoId)
    .single()
    
    if (data) {
      //console.log('tdata', data)
      if(data.transcript == null){
        console.log('data is null')
        fetchTranscriptData()
      }
      else{
        setTranscript(data.transcript)

      }
      
    }
    if(error){
      fetchTranscriptData()
      console.error('tdataerror', error)
    }
  }

  useEffect(() => {
    fetchDatabaseData() 
  }, [])
  
  /* Language */


  const mappings = [
    {name: 'English',code: 'en'},
    {name:'Spanish',code:'es'},
    {name: 'Portuguese', code: 'pt'},
    {name: 'Simplified Chinese', code: 'zh-CN'},
    {name: 'French' , code:'fr'},
    {name: 'Italian' ,code: 'it'}
  ]

  const [lang, setLang] = useState(mappings[0])
  const [newTranscript, setNewTranscript] = useState(null)



  const fetchTranslation = async (lang) => {
    console.log("translation from en to: ", lang.code)
    const encodedParams = new URLSearchParams();
    encodedParams.set('source', 'en'); // source lang
    encodedParams.set('target', lang.code); // target lang
    encodedParams.set('format', 'text')
    encodedParams.set('q', transcript); // text

    const options = {
      method: 'POST',
      url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '3bbf868d53msh78af357de335f9ap1536a6jsn20da07fcbe43',
        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
      },
      data: {
        from: 'en',
        to: lang.code,
        q: transcript
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setNewTranscript(response.data[0])
    } catch (error) {
      console.error(error);
    }
  }

  const displayData = newTranscript ? newTranscript : transcript;


  if(!transcript){
    return(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div>
       <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {lang.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {mappings.map((lang) => (<Dropdown.Item onClick={() => {
            setLang(lang)
            fetchTranslation(lang)
            }}>{lang.name}</Dropdown.Item>))}
        </Dropdown.Menu>
      </Dropdown>
    
      {transcript && <p>{displayData}</p>}
    
    
    </div>
  )
}

export default Transcript