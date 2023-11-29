import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const InstantAnswer = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [response, setResponse] = useState('');

  const getAnswer = async () => {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const appendedPrompt = "Answer in 100 words" + textPrompt;
        const requestBody = {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: appendedPrompt }
          ]
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer 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'
          }
        });

        const responseData = response.data;
        setResponse(responseData.choices[0].message.content);

        // Break out of the loop if successful
        break;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // If rate limited, wait before retrying
          const delay = Math.pow(2, retries) * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          retries++;
        } else {
          console.error("Error fetching response from ChatGPT", error);
          // Handle other errors or display an error message to the user
          break; // Break out of the loop for other errors
        }
      }
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
