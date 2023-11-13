import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const InstantAnswer = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [response, setResponse] = useState('');

  const getAnswer = async () => {
    //const appendedPrompt = "Answer this question only if it is a technology related question, else deny it, If it is a code help, answer the code with heading 'code:'" + textPrompt;
    const appendedPrompt = "Answer in 100 words"+ textPrompt;
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        //{ role: "system", content: "You are a Technical helpful assistant that helps answering Technology, Computer science, coding related questions" },
        { role: "user", content: appendedPrompt }
      ]
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer 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' // Replace with your API key
        }
      });

      const responseData = response.data;

      setResponse(responseData.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response from ChatGPT", error);
      // Handle errors or display an error message to the user
    }
  };

  const cancel = () => {
    // Implement any cancel logic if needed
  };

  return (
    <div style={{ paddingLeft: '220px', paddingRight: '130px' }}>
      <h3 style={{ textAlign: 'center', margin: '20px 0', fontSize: '24px', color: '#333' }}>Get Instant Help</h3>
      <Form>
        <Form.Group>
        <h5>Enter your question</h5>
          <Form.Control
            as="textarea"
            rows={14}
            placeholder="Enter your text prompt..."
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={getAnswer} style={{ marginTop: '10px' }}>Get Answer Now</Button>
        <Button variant="danger" onClick={cancel} style={{ marginTop: '10px', marginLeft: '10px' }}>Cancel</Button>
      </Form>
      {response && (
        <div style={{ marginTop: '20px', marginRight: '50px' }}>
          <h5>Response:</h5>
          <Form.Control
            as="textarea"
            rows={16}
            placeholder="Response will appear here..."
            value={response}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default InstantAnswer;
