import React from 'react'
import Course from '../components/Course'
import courses from '../data/courses'

function History() {
  return (
    <div>
      <h1>History</h1>
      <div className='left-screen'>
          {courses.map(course => <Course course={course} />)}
      </div>
    </div>
  )
}

export default History