import React from 'react'
import Course from '../components/Course'
import Explore from '../components/Explore'

import courses from "../data/courses"
import explore from "../data/explore"

function Home() {
  console.log('course', courses)

  return (  
    <div className='home'>

        <div className='left-screen'>
          <h1>Home</h1>
          {courses.map(course => <Course course={course} />)}
        </div>

        
        <div className='right-screen'>
          <Explore explore={explore}/>
        </div>
    </div>
  )
}

export default Home