import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Comment({videoId}) {
  const [comments, setComments] = useState(null)

  const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  const fetchURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=5&videoId=${videoId}&key=${API_KEY}`


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchURL)
      setComments(response.data.items)
      //console.log('comments', comments)
      //console.log('commentdata', response.data.items[0].snippet.topLevelComment.snippet)      
    }
    fetchData()
  }, [])

  // comment.snippet.topLevelComment.snippet.authorDisplayName
  // comment.snippet.topLevelComment.snippet.textOriginal
 

  return (
    <div className='comments'>
      {comments && comments.map(comment =>
      <div className='comment'>
          <div className='user'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</div>
          <div className='text'>{comment.snippet.topLevelComment.snippet.textOriginal}</div>
      </div>)}
    </div>
  )
}

export default Comment