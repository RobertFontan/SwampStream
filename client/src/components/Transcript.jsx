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

    // update supabase -- handleUpdate()
    insertNewTranscript(response.data)
  }

   const insertNewTranscript = async (newInfo) => {
    console.log('going to insert into supabase', newInfo)
    const {data, error} = await supabase
    .from('Notes')
    .insert({videoId, transcript: newInfo})
    //.eq('videoId', videoId)
    if(data){
      console.log('update successful data inserted', data)
    }
    if(error){
      console.log('update error', error)
    }
    console.log('update done')

  }


  const fetchDatabaseData = async () => {
    console.log('checking data base')
    const { data, error } = await supabase
    .from('Notes')
    .select('transcript')
    .eq('videoId', videoId)
    .single()
    
    if (data) { // this is terrible
      console.log('database on data', data)
      setTranscript(data.transcript)
      // if(data.transcript == null){
      //   fetchTranscriptData()
      // }
    }
    if(error){
      console.error('database error, calling api', error) // this is what should happen
      fetchTranscriptData()
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