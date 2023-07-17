import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'



function NotesSidebar() {

  // get from supabase if notes exist
  const [notes, setNotes] = useState(null)


  
  
  const handleSave = () => {

    // set supabase 
  }

  // supabase pw: w9Kxb2FevOtDMDTF

  return (
    <div className='note-sidebar'>
        <Button onClick={handleSave} variant="outline-primary" size="sm">Save</Button>
        <textarea value={notes}rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  )
}

export default NotesSidebar