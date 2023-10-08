import { useState } from 'react';


function App() {
  const [promptResponse, setPromptResponse] = useState('');



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
              <header className="voiceHead">Speak your story!</header>     
              <div className="container">
                <h3>Characters</h3>
                <textarea id="textarea1" rows="2" cols="40"></textarea>
     
              
                <h3>Style</h3>
                <textarea id="textarea2" rows="2" cols="40"></textarea>            
        
         
                <h3>Location</h3>
                <textarea id="textarea3" rows="2" cols="40"></textarea>
              </div>
              

          <div style={{order: 3}}>
            <button
              onClick={handleSubmit}
            >Submit</button>

          </div>

        
          <div style={{padding: 30}} className="content-answer">
            <h3>Streamed Prompt Response:</h3>
            <span>{promptResponse}</span>
          </div>

        </div>      
      </div>
    </div>
  );
}

export default App;

