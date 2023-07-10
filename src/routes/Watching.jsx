import React from 'react'
import Youtube from 'react-youtube'
import axios from 'axios';

// import youtube from youtube api

function Watching() {
// https://developers.google.com/youtube/player_parameters
// useParms for id

// 

  //const transcriptURL = `http://video.google.com/timedtext?lang=${LANG}&v=#{VIDEOID}`

  // const fetchData = async () {
  //   const response = await axios.get()
  // }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

// https://www.youtube.com/watch?v=xdXd8BJwJ-U

  return (
    <div className='watching'>
      <div className="video-player">
        <Youtube videoId='xdXd8BJwJ-U' opts={opts} onReady={(e) => e.target.pauseVideo()} />
      </div>
      <div className="comments">


      </div>
      <div className="sidebar">
        <div className='transcript'>

        </div>
        <div className="notes"></div>
      </div>

      {/* <VideoPlayer />
      <Comments />
      <SideBar /> */}
      
    
    </div>
  )
}

export default Watching