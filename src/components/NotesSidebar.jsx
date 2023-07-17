import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'



function NotesSidebar() {

    // get from supabase if notes exist
    const [notes, setNotes] = useState(null)



    // const handleSave(e){
    //     console.log(e)
    // }

  return (
    <div className='note-sidebar'>
        <Button variant="outline-primary" size="sm">Save</Button>
        <textarea rows='4' cols='50' />
    </div>
  )
}

export default NotesSidebar