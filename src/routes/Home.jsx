import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import Course from '../components/Course'
import Explore from '../components/Explore'

// dummy info
// import courses from "../data/courses"
import explore from "../data/explore"

import updatedCourses from '../data/updatedCourses'

function Home() {

  //const playlistID = "PLoROMvodv4rMyupDF2O00r19JsmolyXdD" // depending on course 
 // const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  




  return (  
    <div className='home'>

        <div className='left-screen'>
          <h1>Home</h1>
          {updatedCourses.map(course => <Course course={course} />)}
        </div>

        
        <div className='right-screen'>
          <Explore explore={explore}/>
        </div>
    </div>
  )
}

export default Home