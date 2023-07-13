import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import comments from '../data/comments';

import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion'

function Watching() {
  // what should happen when watching is clicked ? 

  const {videoID} = useParams()
  const [description, setDescription] = useState(null)

  const [open, setOpen] = useState(false)

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  const fetchURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${API_KEY}`

  const fetchData = async () => {
    const response = await axios.get(fetchURL)
    console.log('snippet data', response.data.items[0].snippet)
    setDescription(response.data.items[0].snippet.description)
    console.log('description', response.data.items[0].snippet.description)
    console.log('thumbnails', response.data.items[0].snippet.thumbnails)
    
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='watching'>
      <div className="left-screen">
        <div className="video-player"><Youtube videoId={videoID} opts={opts} onReady={(e) => e.target.pauseVideo()} /></div>
        
        {/* <Button>Click me</Button> */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>{description && <div id="description">{description}</div>}</Accordion.Body>
          </Accordion.Item>
          
          <Comment comments={comments} />
        </Accordion>
      
      
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