import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'

function Bullet() {
  const [text, setText] = useState('')
  //const [numb, setNumb] = useState('1')
  const [listRes, setListRes] = useState(null)

  const fetchList = async (e) => {
    e.preventDefault()
    console.log('WE MADE IT!', text)
    
    try {
      const response = await axios.post('http://localhost:5000/generate-list', { userContent: text })
      console.log(response.data)
      setListRes(response.data.summary)
    } catch (error) {
      console.error('ai list error', error)
      setQuestionRes('Error Generating bullets, try again later :(')

    }
  
  
  }


  return (
    <div>
      <Form onSubmit={fetchList}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Make a Bulleted List from the following:</Form.Label>
        {/* <Form.Control size='lg' value={numb} onChange={(e) => setNumb(e.target.value)}/> */}
        <Form.Control className='bullet-text' as="textarea" rows={3} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button className='generate' variant='success'type='submit'>Generate</Button>
        </Form.Group>
      </Form>
      <div className='list-container'>
        {listRes && <div className='answer'>
                <h3>Generated Bullet</h3>
                <p>{listRes}</p></div>}
      </div>
    </div>
  )
}

export default Bullet