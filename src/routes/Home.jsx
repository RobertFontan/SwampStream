import React from 'react'
/* Components */
import Navbar from '../components/Navbar'
import Course from '../components/Course'
import Explore from '../components/Explore'

import courses from "../data/courses"
import explore from "../data/explore"
/* Bootstrap  */
import { Container, Row, Col, Nav } from 'react-bootstrap'
function Home() {

  return (  
    <>
    <Container fluid className='home'>
        <Row>
          <Col sm={2} className='navbar-container'>
            <Navbar/>
          </Col>
          <Col sm={8} className='left-screen'>
            <h1>Lectures</h1>
            {courses.map(course => <Course course={course} />)}
          </Col>
          <Col sm={2} className='right-screen'>
            <Explore explore={explore}/>
          </Col>
        </Row>
    </Container>
    </>
  )
}

export default Home