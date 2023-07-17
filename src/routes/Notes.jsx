import React, {useState, useEffect} from 'react'
import './Notes.css'


import supabase from '../config/supabaseClient'


function Notes() {

  const [notes, setNotes] = useState(null)

  


  useEffect(() => {
    const fetchData = async () =>{
      
      const { data, error } = await supabase
      .from('Notes')
      .select('*')

      setNotes(data)
      console.log('data', data)

    } 
    fetchData()
  
  }, [])



  return (

    <div className = "notes">
      {notes && 
      <div>
        Notes hello
        <nav>
          <div></div>
          <div>video two</div>
        </nav>
      </div>
    }
    </div>
  )
}

export default Notes