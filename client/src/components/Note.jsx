import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";

import supabase from "../config/supabaseClient";

function Note({videoID, data}) {
  const [notes, setNotes] = useState(data)

  const handleSave = async () => {
    const {data, error} = await supabase
    .from('Notes')
    .update({Notes: notes})
    .eq('videoId', videoID)
    if(data){
      console.log('handlesave', data)
    }
    if(error){
      console.log('handleSaveErr', error)
    }
  } 



  return (
    <div className='note'>
      <Button variant="dark" className="note-save" onClick={handleSave}>Save</Button>
      <textarea key={videoID} value={notes} rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  );
}

export default Note