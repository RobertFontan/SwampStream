import React from 'react'
import Video from './Video'

function Explore({explore}) {
  return (
    <div className='explore'>
        <h2>Explore</h2>
        <div className='explore-videos'>
          {explore && explore.map(vid => <Video video={vid} />)}
        </div>
    </div>
  )
}

export default Explore