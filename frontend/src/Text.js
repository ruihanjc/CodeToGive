import { useState, useEffect } from 'react';
import './Text.css'; 

function App() {
  const [promptResponse, setPromptResponse] = useState('');

    const msg = new SpeechSynthesisUtterance()
    const [ourText, setOurText] = useState("")

    const speechHandler = (msg) => {
      msg.text = ourText
      window.speechSynthesis.speak(msg)
    }



  const handleSubmit = async () => {
    
    var characters = document.getElementById("textarea1").value;

    const url = 'http://localhost:4444/api/textPrompt';
    var tmpPromptResponse = '';
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `Create a story of 100 words, with main ideas like this ${characters}$`,
        }),
      });
      
      // eslint-disable-next-line no-undef
      let decoder = new TextDecoderStream();
      if (!response.body) return;
      const reader = response.body
        .pipeThrough(decoder)
        .getReader();
      
      while (true) {
        var {value, done} = await reader.read();
        
        if (done) {
          break;
        } else {
          tmpPromptResponse += value;
          setPromptResponse(tmpPromptResponse);
          setOurText(tmpPromptResponse)
        }
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
        <div className= "textBody">
            <div style={{ textAlign: 'center' , flexDirection: 'column', justifyContent: 'center'}}>

            
            <div style={{display: 'flex', flexDirection: 'column'}}>
            
            <div class="logo-wrapper">
                <header className="voiceHead">Type your story!</header>   
                <h>_</h>
            </div>
              <div  className="container">
                <button className="textButton"
                  onClick={handleSubmit}
                >Here we go!</button>
              </div>  

              <div className="container">
                <h3>Ideas!</h3>
                <textarea id="textarea1" rows="3" cols="80"></textarea>
              </div>
              

          <div style={{padding: 0}} className="text-content-answer" value={ourText} onChange={(e) => setOurText(e.target.value)}>
            <h3>Here's your story:</h3>
            <span>{promptResponse}</span>
          </div>


          <h1>Hear your story with us!</h1>
          <button onClick={() => speechHandler(msg)}>SPEAK</button>
          

        </div>      
      </div>
    </div>
  );
}

export default App;

