import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'

function Questions() {
  const [text, setText] = useState('')
  const [questionRes, setQuestionRes] = useState(null)


  const fetchQuestions = async (e) => {
    e.preventDefault()


    try {
      const response = await axios.post('http://localhost:5000/generate-questions', { userContent: text })
      console.log(response.data)
      setQuestionRes(response.data.summary)
    } catch (error) {
      console.error('ai question error', error)
      setQuestionRes('Error Generating Questions, try again later :(')
    }
  }

  return (
    <div>
      <Form onSubmit={fetchQuestions}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Make Questions from the following:</Form.Label>
        <Button type='submit'>+</Button>
        {/* <Form.Control size='lg' value={numb} onChange={(e) => setNumb(e.target.value)}/> */}
        <Form.Control as="textarea" rows={3} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button type='submit'>+</Button>
        </Form.Group>
      </Form>
      <div className='question-container'>
        {questionRes && <p>{questionRes}</p>}
      </div>
    </div>
  )
}

export default Questions