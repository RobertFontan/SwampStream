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
  const [filter, setFilter] = useState('date')


  const handleFilter = async () => {
    if (filter == 'title') {
      // depening on filter
      const {data , error} = await supabase
      .from('Saved')
      .select('*')
      .order(filter, {ascending: true})

      if(data){
        console.log('FIL data', data)
        setSaved(data)
      }
      if(error){
        console.log("FIL ERR", error)
      }
    }
    else {
      // depening on filter
      const {data , error} = await supabase
      .from('Saved')
      .select('*')
      .order(filter, {ascending: false})

      if(data){
        console.log('FIL data', data)
        setSaved(data)
      }
      if(error){
        console.log("FIL ERR", error)
      }
    }

  }


  useEffect(()=> {
    handleFilter()
  }, [filter])
  // everytime the filter changes it should be loading new information


  return (
    <div className='saved'>
      <h1>Saved</h1>

      <Dropdown data-bs-theme="dark" className='saved-page-dropdown'>
        <h5>Filter by</h5>
        <Dropdown.Toggle variant="secondary" >{filter}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilter('class')}>Class (a-z)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('class')}>Class (z-a)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('length')}>Length (shortest - longest)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('length')}>Length (longest - shortest)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('date')}>Date (earliest)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('date')}>Date (latest)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('title')}>Title (a-z)</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('title')}>Title (z-a)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="saved-container">
          {saved && saved.map((elementInArray) => <Video course={elementInArray.class} video={elementInArray}/>)}
      </div>
    </div>
  )
}

export default Saved