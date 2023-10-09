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
    var style = document.getElementById("textarea2").value;
    var location = document.getElementById("textarea3").value;

    const url = 'http://localhost:4444/api/textPrompt';
    var tmpPromptResponse = '';
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `Create a story of 300 words, with main characters called: ${characters}, style: ${style}, location: ${location}`,
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
                <h>Please fill the details you want for the story</h>
            </div>
                <h3></h3>
                <h3></h3>
              <div  className="container">
                <button className="textButton"
                  onClick={handleSubmit}
                >Here we go!</button>
              </div>  

              <div className="container">
                <h3>Protagonists!</h3>
                <textarea id="textarea1" rows="2" cols="70"></textarea>
     
              
                <h3>Style!</h3>
                <textarea id="textarea2" rows="2" cols="70"></textarea>            
        
         
                <h3>Place!</h3>
                <textarea id="textarea3" rows="2" cols="70"></textarea>
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

