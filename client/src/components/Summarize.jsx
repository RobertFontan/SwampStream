import axios from 'axios'
import React, {useState} from 'react'
import { Dropdown, DropdownButton, Form, InputGroup, Button, Offcanvas } from 'react-bootstrap'

function Summarize() {
  const [text, setText] = useState('')
  const [option, setOption] = useState('paragraph(s)')
  const [numb, setNumb] = useState('1')
  const [summary, setSummary] = useState(null)
  // const { Configuration, OpenAIApi } = require("openai");

  // const configuration = new Configuration({
  //   apiKey: import.meta.env.VITE_OPENAI_KEY,
  // });
  // const openai = new OpenAIApi(configuration);
  
  // /* Counting Input Tokens */
  function countTokens(text) {
    // This is a very simplified approximation and might not always be correct.
    // The actual tokenization algorithm used by OpenAI may produce different results.

    // Replace all multiple spaces, tabs, newlines, etc. with a single space
    text = text.replace(/\s\s+/g, ' ');

    // Split the text by space (approximating words as tokens)
    const words = text.split(' ');

    let tokens = 0;
    words.forEach(word => {
        // Each word is a token, unless it's more than one byte, then each byte is a token
        tokens += Math.max(1, encodeURI(word).split(/%..|./).length - 1);
    });

    return tokens;
  }

    // counting output tokens
  function calculateMaxTokens(number, option) {
      const averageTokensPerSentence = 15; // Adjust this value based on your model and typical sentence length
      const averageTokensPerParagraph = 100; // Adjust this value based ohttp://localhost:5173/ your model and typical paragraph length

      if (option === 'sentences') {
        return number * averageTokensPerSentence;
      } else if (option === 'paragraphs') {
        return number * averageTokensPerParagraph;
      } else {
        throw new Error('Invalid option. Please choose "sentences" or "paragraphs".');
      }
  }

  const fetchData = async (e) => {
    e.preventDefault()
    console.log('fetchData summary', numb, option, text)
    
    try {
      const response = await axios.post('http://localhost:5000/generate-summary', { userContent: text, number: numb, option: option })
      console.log(response.data)
      setSummary(response.data.summary)
    } catch (error) {
      console.error('ai summary error', error)
    }
  }

  return (
    <div>
        <Form onSubmit={fetchData}>  
            <div className="header">
                Summarize using GPT in:
                <InputGroup >
                  <Form.Control size='lg' value={numb} onChange={(e) => setNumb(e.target.value)}/>
                  <DropdownButton
                    variant="outline-secondary"
                    title={option}
                    align="end"
                  >
                    <Dropdown.Item onClick={() => setOption('paragraph(s)')}>paragraph(s)</Dropdown.Item>
                    <Dropdown.Item onClick={() => setOption('sentence(s)')}>sentence(s)</Dropdown.Item>
                  </DropdownButton>
                  
                </InputGroup>

                <Button variant='success' type='submit'> Summarize!</Button>

            </div>

        
            <textarea value={text} rows='4' cols='40' onChange={(e) => setText(e.target.value)}/>

            <p>Estimated Tokens: {countTokens(text)}</p>

        </Form>


        <div className='summary-container'>
            {summary && <p>{summary}</p>}
        </div>
    </div>
  )
}

export default Summarize