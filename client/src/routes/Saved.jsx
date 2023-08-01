import React, {useState, useEffect} from 'react'
import {Button, Dropdown } from 'react-bootstrap'


import Video from '../components/Video'
import supabase from '../config/supabaseClient'

function Saved() {
  // saved is array of videos 
  const [saved, setSaved] = useState(null)

  // get info from supabase
  useEffect(() =>{
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('Saved')
      .select('*')

      // updates array of saved videos
      setSaved(data)

    }
    fetchData()
  }, []) 

  // setting up filters
  const [filter, setFilter] = useState('nothing')


  return (
    <div>
      <h1>Saved</h1>
      <Dropdown>
        Filter by
        <Dropdown.Toggle variant="success" id="dropdown-basic">{filter}</Dropdown.Toggle>
    
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilter('class')}>Class</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('length')}>Length</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('date')}>Date</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {saved && saved.map((elementInArray) => <Video video={elementInArray}/>)}
    </div>
  )
}

export default Saved