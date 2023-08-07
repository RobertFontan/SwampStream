import React, {useState, useEffect} from 'react'
import {Button, Alert} from 'react-bootstrap'

import supabase from '../config/supabaseClient'

function NotesSidebar({pRef ,title ,videoId}) {
  const [data, setData] = useState(null)
  const [notes, setNotes] = useState(null)
  const [timestamps, setTimestamps] = useState(null) // get from db?

  // getting notes && timestamps
  useEffect(() => {
    const fetchData = async () =>{
      const { data, error } = await supabase
      .from('Notes')
      .select('Notes, Timestamps')
      .eq('videoId', videoId)
      .single()
      if(error){
        console.log('initRender', error)
      }

      if (data) { 
        console.log('notedata', data.Timestamps)
        setData(data)
        setNotes(data.Notes)
        setTimestamps(data.Timestamps)
      }
    } 
    fetchData()
  }, [])

  // updates row if error insert row
  const handleSave = async () => {
    const {data, error} = await supabase
    .from('Notes')
    .update({Notes: notes, Timestamps: timestamps})
    .eq('videoId', videoId)
    if(data){
      console.log('handlesave', data)
    }
    if(error){
      console.log('handleSaveErr', error)
    }

    if(error == null){
      const { error } = await supabase
      .from('Notes')
      .insert({ Timestamps: timestamps, title: title, videoId, Notes: notes })
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


  // on submitting timestamps
  const handleSubmit = (e) => {
    e.preventDefault()
    const newDisplay = display
    const newSeconds = pRef.current.getCurrentTime()
    const newTS = {display: newDisplay, seconds: newSeconds}

    if(timestamps == null){
      // setting initial timestamp
      setTimestamps([newTS])
    }
    else{
      setTimestamps((prev) => [...prev, newTS])
    }

    //handleTimeStampSave()

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
        <div className="header">
          <Button onClick={handleSave} className='note-sidebar-btn'variant="outline-primary">Save</Button>
          <Button onClick={handleShow} className='note-sidebar-btn'>Create TimeStamp</Button>
        </div>

        {pRef.current && <Alert onClose={() => setShow(false)}variant="light" show={show} dismissible>
          <Alert.Heading>Timestamp at {fancyTimeFormat(pRef.current.getCurrentTime())}</Alert.Heading>
          <form onSubmit={handleSubmit}>
            <input type="text" value={display} onChange={(e) => setDisplay(e.target.value)} placeholder='Enter a title!'/>
            <input type="submit" value='Create' />
          </form>
        </Alert>}
        {timestamps &&
        <div className="timestamp-container">
           {timestamps.map((e) => (<Button className='timestamp-btn' variant="info" onClick={() => timeStampClick(e.seconds)}>{e.display}</Button>))}
        </div>}
        <textarea value={notes} rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  )
}

export default NotesSidebar