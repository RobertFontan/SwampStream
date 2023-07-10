import React from 'react'

function Comment({comment}) {
  return (
    <div className='comment'>
        <div className='user'>
            {comment.user}
        </div>
        <div className='text'>
            {comment.text}
        </div>
    </div>
  )
}

export default Comment