//import { useState } from 'react'
import { Link, Routes, Route, BrowserRouter} from "react-router-dom"
import './App.css'


import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './routes/Login'
import History from './routes/History'
import Home from './routes/Home'
import Notes from './routes/Notes'
import Saved from './routes/Saved'
import Watching from './routes/Watching'

import NavBar from "./components/Navbar";

import { Container, Row, Col, Nav } from 'react-bootstrap'


function App() {

  return (
    <BrowserRouter>
      <Container fluid>
        {/* <div className='App'> */}
          <Row className="App">
            <Col lg={2}>
              <NavBar />
            </Col>
            <Col className="content">
              <Routes>
                   <Route path="/" element={<Home />}/>
                   <Route path="/watching/:videoID" element={<Watching />}/>
                   <Route path="/notes" element={<Notes />}/>
                   <Route path="/saved" element={<Saved />}/>
                   <Route path="/history" element={<History />}/>
              </Routes>
            </Col>
          </Row>
        {/* </div> */}
      </Container>
    </BrowserRouter>
  )
}

export default App
