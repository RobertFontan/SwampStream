import React, {useState, useEffect} from 'react'
import './Notes.css'


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
      {notes && 
      <div>
        Notes hello

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">Tab 1</NavItem>
                <NavItem eventKey="second">Tab 2</NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
                <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>;
        
      </div>
    }
    </div>
  )
}

export default Notes