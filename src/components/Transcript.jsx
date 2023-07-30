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



  const fetchTranslation = async () => {
    console.log("translation")
    
    if(lang.code == 'en'){
      
      console.log('english')
      return;
    }
    else{
      const encodedParams = new URLSearchParams();
      encodedParams.set('source', 'en'); // source lang
      encodedParams.set('target', lang.code); // target lang
      encodedParams.set('format', 'text')
      encodedParams.set('q', transcript); // text

      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '3bbf868d53msh78af357de335f9ap1536a6jsn20da07fcbe43',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams
      }
      const {data, error} = await axios.request(options)
      
      if(data) {
        console.log(data)
        console.log(data.translations)
        setTranscript(data.translations[0].translatedText)
      }
      if(error){
        console.log(error)
      }

  
    }
  }

  useEffect(()=>{

    fetchTranslation()


  }, [lang]) 

  // if language is not english handle search
  // if language is english language then dont call to api 
  // maybe save to supabase 



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
          {mappings.map((lang) => (<Dropdown.Item onClick={() => setLang(lang)}>{lang.name}</Dropdown.Item>))}
        </Dropdown.Menu>
      </Dropdown>
    
      {transcript && <p>{transcript}</p>}
    
    
    </div>
  )
}

export default Transcript