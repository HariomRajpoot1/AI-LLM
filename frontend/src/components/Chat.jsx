import React, { useState } from 'react'
import {sendMessageToAI} from '../services/api' 

function Chat() {
  const [input, setInput] = useState(); 
  const [message, setMessage] = useState([]);

  const handleSend = async()=> {
    
    const newMessage = [...message, {role:"user", text : input}]
    setMessage(newMessage)  
    const reply = await sendMessageToAI(input)
    setMessage([...newMessage, { role: "ai", text: reply }]);
    setInput("")

  }
  return (
    <div>
      Hariom chat
      {/* message */}
      <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px" }}>
        {message.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
          </p>
        ))}
      </div>


      {/* input */}
      <input 
      type ="text"
      value = {input}
      onChange={(e)=> setInput(e.target.value) }
      placeholder='text input ...'
      />

      <button onClick={handleSend}>
        send
      </button>
    </div>
  )
}

export default Chat
