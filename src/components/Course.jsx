import React from 'react'
import Video from './Video'

function Course({course}) {
  
  return (

    <div className='course'>
        <h1>{course.title}</h1>
        <div className="course-videos">{course.videos.map(vid => <Video video={vid} />)}</div>
    </div>
  )
}

export default Course