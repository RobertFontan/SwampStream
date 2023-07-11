import React, { useEffect } from 'react'
import Youtube from 'react-youtube'
import comments from '../data/comments';

import Comment from '../components/Comment';
function Watching() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };




  return (
    <div className='watching'>
      <div className="left-screen">
        <div className="video-player">
          <Youtube videoId='xdXd8BJwJ-U' opts={opts} onReady={(e) => e.target.pauseVideo()} />
        </div>
      <Comment comments={comments} />
      </div>
      <div className='right-screen'>
        <div className="sidebar">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus mauris a diam maecenas. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Ut consequat semper viverra nam libero justo. Turpis massa sed elementum tempus egestas sed sed risus pretium. Id faucibus nisl tincidunt eget nullam non. Ut sem viverra aliquet eget sit. Tempor commodo ullamcorper a lacus vestibulum sed. Mattis molestie a iaculis at erat pellentesque. Nec tincidunt praesent semper feugiat nibh. In fermentum posuere urna nec tincidunt. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Dignissim diam quis enim lobortis scelerisque fermentum. Etiam sit amet nisl purus in mollis nunc. Pellentesque sit amet porttitor eget dolor. Nibh mauris cursus mattis molestie a iaculis. Venenatis a condimentum vitae sapien pellentesque.
          Et malesuada fames ac turpis egestas sed tempus urna. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Id neque aliquam vestibulum morbi. Arcu cursus euismod quis viverra nibh cras pulvinar. Tortor posuere ac ut consequat semper viverra. Pretium nibh ipsum consequat nisl vel pretium. Aliquam malesuada bibendum arcu vitae elementum curabitur. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Id neque aliquam vestibulum morbi blandit cursus. Fermentum posuere urna nec tincidunt praesent semper feugiat. Sit amet volutpat consequat mauris nunc congue nisi. Commodo odio aenean sed adipiscing diam.
          Et malesuada fames ac turpis egestas. Lectus arcu bibendum at varius vel pharetra vel turpis. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Praesent tristique magna sit amet purus gravida quis blandit. Tristique nulla aliquet enim tortor at. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Ipsum dolor sit amet consectetur adipiscing. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. At imperdiet dui accumsan sit amet. Sed egestas egestas fringilla phasellus faucibus scelerisque. Non enim praesent elementum facilisis leo. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Pellentesque adipiscing commodo elit at imperdiet dui.
        </div>
      </div>

      {/* <VideoPlayer />
      <Comments />
      <SideBar /> */}
      
    
    </div>
  )
}

export default Watching