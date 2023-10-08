import { useState } from 'react';


function App() {
  const [promptResponse, setPromptResponse] = useState('');



  const handleSubmit = async () => {

    var characters = document.getElementById("textarea1").value;
    var style = document.getElementById("textarea2").value;
    var time = document.getElementById("textarea3").value;

    const url = 'http://localhost:4444/api/textPrompt';
    var tmpPromptResponse = '';
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `Create a story of 300 words, with main characters called: ${characters} and a style of ${style} as well as the time of ${time}`,
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

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      
      <div style={{order: 1, width: '80vh'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h2 style={{order: -1}}>Show your imagination!</h2>        

          <h3>Characters</h3>
          <textarea id="textarea1" rows="2" cols="50"></textarea>
          <h3>Style</h3>
          <textarea id="textarea2" rows="2" cols="50"></textarea>
          <h3>Time</h3>
          <textarea id="textarea3" rows="2" cols="50"></textarea>

          <div style={{order: 3}}>
            <button
              onClick={handleSubmit}
            >Submit</button>
          </div>

          <div style={{order: 4, marginTop: '1rem'}}>
            <h3>Streamed Prompt Response:</h3>
            <span>{promptResponse}</span>
          </div>

        </div>      
      </div>
    </div>
  );
}

export default App;

