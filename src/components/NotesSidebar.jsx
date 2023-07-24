import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'

import supabase from '../config/supabaseClient'

function NotesSidebar({title ,videoId}) {

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

  // inserting timestamp



  
  
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

  /* key press logic 

  const [isCommand, setIsCommand] = useState(false)
  const [command, setCommand] = useState('')

  const handleKeyPress = async (e) => {
    const keyPressed = e.key
    console.log('key', keyPressed)

    if(isCommand){
      console.log('COMMAND')
      if(keyPressed == ' '){
        console.log('command ended', command)
        setIsCommand(false)
      }
      else{
        setCommand((prev) => prev + keyPressed)        
      }
    }
    else if(keyPressed == '/'){
      console.log('command init')
      setIsCommand(true)
      setCommand('')
    }
    
  }

  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    // Don't forget to remove the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
*/
  

  return (
    <div className='note-sidebar'>
        <Button onClick={handleSave} variant="outline-primary" size="sm">Save</Button>
        <textarea value={notes}rows='4' cols='50' onChange={(e) => setNotes(e.target.value)}/>
    </div>
  )
}

export default NotesSidebar