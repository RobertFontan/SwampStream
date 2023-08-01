import React, {useState, useEffect} from 'react'
import './Notes.css'
import {Col, Nav, Row, Tab} from 'react-bootstrap';

import Note from '../components/Note';

import supabase from '../config/supabaseClient'


function Notes() {

  const [notes, setNotes] = useState(null)

  useEffect(() => {
    const fetchData = async () =>{
      
      const { data, error } = await supabase
      .from('Notes')
      .select('Notes, title, videoId')


      if(data){
        setNotes(data)
        console.log('NOTES', data)
      }
      if(error){
        console.log('NOTES ERROR', error)
      }
    } 
    fetchData()
  
  }, [])



  return (
    <>
    {notes && <div className = "notes">
      <h1>Notes</h1>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={2}>
              <Nav>
                { notes.map((e) => (
                  <Nav.Item>
                    <Nav.Link eventKey={e.videoId}>{e.title}</Nav.Link>
                  </Nav.Item>))
                }
              </Nav>
            </Col>
            <Col>

              <Tab.Content>
                {notes.map((e) => (
                  <Tab.Pane eventKey={e.videoId}>
                    <Note videoID={e.videoId} data={e.Notes} />
                    
                  </Tab.Pane>

                ))}
              </Tab.Content>
            
            </Col>
          </Row>
        </Tab.Container>
    </div>}
    </>
  )
}

export default Notes