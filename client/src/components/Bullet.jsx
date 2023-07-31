import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'

function Bullet() {
  const [text, setText] = useState('')
  const [listRes, setListRes] = useState(null)

  const fetchList = async (e) => {
    e.preventDefault()
    console.log('WE MADE IT!', text)
    
    try {
      const response = await axios.post('http://localhost:5000/generate-list', { userContent: text, number: numb, option: option })
      console.log(response.data)
      setListRes(response.data.summary)
    } catch (error) {
      console.error('ai list error', error)
    }
  
  
  }


  return (
    <div>
      <Form onSubmit={fetchList}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Make a Bulleted List from the following:</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button type='submit'>+</Button>
        </Form.Group>
      </Form>
      <div className='list-container'>
        {listRes && <p>{listRes}</p>}
      </div>
    </div>
  )
}

export default Bullet