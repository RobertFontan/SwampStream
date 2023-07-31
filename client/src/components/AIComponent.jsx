import React, {useState} from 'react'
import { Dropdown, DropdownButton, Form, InputGroup, Button, Offcanvas } from 'react-bootstrap'
//import tiktoken from 'tiktoken';

import {Robot} from 'react-bootstrap-icons'
import Summarize from './Summarize';
import Questions from './Questions';
import Bullet from './Bullet';

function AIComponent() {
    

    // offcanvas logic
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [option, setOption] = useState('Summarize')

    const renderOption = () => {
      switch(option){
        case 'Summarize':
          return <Summarize />
        case 'List':
          return <Bullet />
        case 'Questions':
          return <Questions />
        default:
          return <p>Error</p>
      }
    }
    

  return (
    <div className='summ-container'>
      <Button variant='primary' onClick={handleShow}>
        <Robot>GPT</Robot>
      </Button>
       
        
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              GPT Features: {option}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setOption('Summarize')}>Summarize</Dropdown.Item>
              <Dropdown.Item onClick={() => setOption('List')}>List</Dropdown.Item>
              <Dropdown.Item onClick={() => setOption('Questions')}>Questions</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {renderOption()}
        </Offcanvas.Body>
      </Offcanvas>


    </div>
  ) 
}

export default AIComponent