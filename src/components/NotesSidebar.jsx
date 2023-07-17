import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'

import supabase from '../config/supabaseClient'

function NotesSidebar({videoId}) {

  // videoId: WW1g3UT2zww

  // get from supabase if notes exist

  //console.log('vidid', videoId)
  const [notes, setNotes] = useState(null)


  // getting notes 
  useEffect(() => {
    const fetchData = async () =>{
      const { data, error } = await supabase
      .from('Notes')
      .select('Notes')
      .eq('videoId', videoId)
      .single()

      if (data) {
        //console.log('notedata', data)
        setNotes(data.Notes)
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
      .insert({ videoId, Notes: notes })
    }
  }


  return (
    <div className='note-sidebar'>
        <Button onClick={handleSave} variant="outline-primary" size="sm">Save</Button>
        <textarea value={notes}rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  )
}

export default NotesSidebar