import React, {useState} from 'react'
import { Dropdown, DropdownButton, Form, InputGroup, Button } from 'react-bootstrap'
//import tiktoken from 'tiktoken';


function Summarize() {
    const [text, setText] = useState('')
    const [option, setOption] = useState('paragraph(s)')
    const [numb, setNumb] = useState('1')


    /* Counting Input Tokens */

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

    const handleGpt = async () => {
      console.log('gpt called with', numb, option)

      const { Configuration, OpenAIApi } = require("openai");

      const configuration = new Configuration({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": `Summarize content you are provided with in ${numb + " " + option}`
          },
          {
            "role": "user",
            "content": {text}
          }
        ],

        temperature: 0, // 0(consistent) - 1(creative)
        max_tokens: calculateMaxTokens(numb, option) + 1000, 
        frequency_penalty: 0, // -2 -2(penalize frequency of tokens)
        presence_penalty: 0, // -2 - 2(penalize old topics)
      });
      // do something with response 
    }


  return (
    <div className='summ-container'>
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
          {/* <Button variant='success' onClick={handleGpt()}>+</Button> */}
        </div>
        <textarea value={text} rows='4' cols='50' onChange={(e) => setText(e.target.value)}/>
        <p>Estimated Tokens: {countTokens(text)}</p>
    </div>
  ) 
}

export default Summarize