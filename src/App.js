import React, {useState} from 'react';
import './App.css';

export default function App(){
  const[message, setMessage] = useState('');
  const[response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message}),
    })
      .then((res)=> res.json())
      .then((data)=> setResponse(data.image_url))
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/chat',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message}),
    })
      .then((res)=> res.json())
      .then((data)=> setResponse(data.message))
  };
  return(
    <div className="App">
      <form >
        <textarea
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit} type="submit">Generate image</button>
        <button onClick={handleSubmit2} type="submit">Ask a Question</button>
      </form>
      <div>{response}</div>
      <div><img src={response} alt=""></img></div>
    </div>
  );
}

