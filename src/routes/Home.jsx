import React from 'react'
/* Components */
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import Course from '../components/Course'
import Explore from '../components/Explore'

// dummy info
import explore from "../data/explore"
/* Bootstrap  */
import { Container, Row, Col, Nav } from 'react-bootstrap'
import courses from '../data/courses'
function Home() {

  //const playlistID = "PLoROMvodv4rMyupDF2O00r19JsmolyXdD" // depending on course 
 // const API_KEY = "AIzaSyCIFWHUm93iCiFfytTQGPtu-MzyXoUrIAY"
  
  return (  
    <>
    <Container fluid="xs" className='home'>
        <Row>
          <Col lg={9} className='left-screen'>
            <h1>Lectures</h1>
            {courses.map(course => <Course course={course} />)}
          </Col>
          <Col lg={3} className='right-screen'>
            <Explore explore={explore}/>
          </Col>
        </Row>
    </Container>
    </>
  )
}

export default Home