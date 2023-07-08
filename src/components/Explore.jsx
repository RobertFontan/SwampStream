import React from 'react'
import Video from './Video'

function Explore({explore}) {
  return (
    <div className='explore'>
        <h1>Explore</h1>
        {explore && explore.map(vid => <Video video={vid} />)}
    </div>
  )
}

export default Explore