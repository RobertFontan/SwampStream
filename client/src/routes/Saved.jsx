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
  const [ascending, setAscending] = useState(false)


  const handleFilter = async () => {
    console.log('Sorting by' + filter)
    if (ascending) {
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
  }, [filter, ascending])
  // everytime the filter changes it should be loading new information


  return (
    <div className='saved'>
      <h1>Saved</h1>

      <Dropdown data-bs-theme="dark" className='saved-page-dropdown'>
        <h5>Filter by</h5>
        <Dropdown.Toggle variant="secondary" >{filter}</Dropdown.Toggle>
        <Dropdown.Menu>

          <Dropdown.Item onClick={() => {
            setFilter('class')
            setAscending(true)}}>
            Class (a-z)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setFilter('class')
            setAscending(false)}}>
            Class (z-a)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setFilter('length')
            setAscending(true)}}>
            Length (shortest - longest)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setFilter('length')
            setAscending(false)}}>
            Length (longest - shortest)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setFilter('date')
            setAscending(true)}}>
            Date (oldest)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setFilter('date')
            setAscending(false)}}>
            Date (newest)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setAscending(true)
            setFilter('title')}}>
            Title (a-z)
          </Dropdown.Item>

          <Dropdown.Item onClick={() => {
            setAscending(false)
            setFilter('title')}}>
            Title (z-a)
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <div className="saved-container">
          {saved && saved.map((elementInArray) => <Video course={elementInArray.class} video={elementInArray}/>)}
      </div>
    </div>
  )
}

export default Saved