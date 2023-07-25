import React, {useState, useEffect} from 'react'
import {Button, Alert} from 'react-bootstrap'

import supabase from '../config/supabaseClient'

function NotesSidebar({pRef ,title ,videoId}) {
  const [data, setData] = useState(null)
  const [notes, setNotes] = useState(null)
  const [timestamps, setTimestamps] = useState([]) // get from db?

  // getting notes && timestamps
  useEffect(() => {
    const fetchData = async () =>{
      const { data, error } = await supabase
      .from('Notes')
      .select('Notes, timestamps')
      .eq('videoId', videoId)
      .single()

      if (data) {
        console.log('notedata', data)
        setData(data)
        setNotes(data.Notes)
        setTimestamps(data.timestamps)
      }
    } 
    fetchData()
  }, [])

  // updates row if error insert row
  const handleSave = async () => {
    const {data, error} = await supabase
    .from('Notes')
    .update({'Notes': notes})
    .eq('videoId', videoId)

    if(error == null){
      const { error } = await supabase
      .from('Notes')
      .insert({ title: title, videoId, Notes: notes })
    }
  }

  // inserting timestamp

  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState('')


  const timeStampClick = (seconds) =>{
    if(pRef.current){
      pRef.current.seekTo(seconds)
    }
  }

  useEffect(() => {
    const handleTimeStampSave = async () => {
      console.log('local timestamp', timestamps)
  
      const {data, error} = await supabase
      .from('Notes')
      .update({timestamps})
      .eq('videoId', videoId)
  
      console.log('d timestamp', data)
      console.log('e timestamp', error)

      // if(error == null){
      //   const { error } = await supabase
      //   .from('Notes')
      //   .insert({ 'timestamps': timestamps })
      // }
    }
    handleTimeStampSave()

  }, [timestamps])

  

  // on submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const newDisplay = display
    const newSeconds = pRef.current.getCurrentTime()
    const newTS = {display: newDisplay, seconds: newSeconds}
    setTimestamps((prev) => [...prev, newTS])

    setShow(false)
    setDisplay('')
  }



  const handleShow = () =>{
    setShow(true)
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }
  



  return (
    <div className='note-sidebar'>
        <Button onClick={handleSave} variant="outline-primary" size="sm">Save</Button>
        <Button onClick={handleShow}>Create TimeStamp</Button>

        {pRef.current && <Alert onClose={() => setShow(false)}variant="light" show={show} dismissible>
          <Alert.Heading>Timestamp at {fancyTimeFormat(pRef.current.getCurrentTime())}</Alert.Heading>
          <form onSubmit={handleSubmit}>
            <input type="text" value={display} onChange={(e) => setDisplay(e.target.value)} placeholder='Enter a title!'/>
            <input type="submit" value='Create' />
          </form>
        </Alert>}
        
        <div className="timestamp-container">
          {timestamps && timestamps.map((e) => (<Button variant="info" onClick={() => timeStampClick(e.seconds)}>{e.display}</Button>))}
        </div>
        <textarea value={notes} rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  )
}

export default NotesSidebar