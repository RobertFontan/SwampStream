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


    const [option, setOption] = useState('Summary')

    const renderOption = () => {
      switch(option){
        case 'Summary':
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
    <div className='ai-container'>
      <Button variant='primary' onClick={handleShow}>
        <Robot>GPT</Robot>
      </Button>
       
        
      <Offcanvas show={show} onHide={handleClose} backdrop="static" >
        <Offcanvas.Header closeButton className='ai-component-header'>
          <Offcanvas.Title className='dropdown-container-ai'>
            <h2>{option}</h2>
            <Dropdown className='dropdown'>
              <Dropdown.Toggle variant="success" className="dropdown-basic-ai">
                Generate the following: {option}
              </Dropdown.Toggle>
              <Dropdown.Menu id='dropdown-basic-menu'>
                <Dropdown.Item onClick={() => setOption('Summary')}>Summary</Dropdown.Item>
                <Dropdown.Item onClick={() => setOption('List')}>List</Dropdown.Item>
                <Dropdown.Item onClick={() => setOption('Questions')}>Questions</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='ai-component-body'>
          {renderOption()}
        </Offcanvas.Body>
      </Offcanvas>


    </div>
  ) 
}

export default AIComponent