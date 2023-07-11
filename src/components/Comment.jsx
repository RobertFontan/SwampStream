import React from 'react'

function Comment({comments}) {



  return (
    <div className='comments'>
      {comments.map(comment =>
      <div className='comment'>
          <div className='user'>
              {comment.user}
          </div>
          <div className='text'>
              {comment.text}
          </div>
      </div>)}
    </div>
  )
}

export default Comment