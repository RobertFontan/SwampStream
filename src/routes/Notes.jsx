import React, {useState, useEffect} from 'react'
import './Notes.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer'


import supabase from '../config/supabaseClient'


function Notes() {

  const [notes, setNotes] = useState(null)

  useEffect(() => {
    const fetchData = async () =>{
      
      const { data, error } = await supabase
      .from('Notes')
      .select('*')

      setNotes(data)
      console.log('data', data)

    } 
    fetchData()
  
  }, [])



  return (

    <div className = "notes">
      {/* {notes && } */}
      <h1>
        Notes
      </h1>
      <div>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={2}>
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab 2</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="first">First Tab Content</Tab.Pane>
                <Tab.Pane eventKey="second">Second Tab Content</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  )
}

export default Notes