
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import './Voice.css'; 


function Voice() {
  const [promptResponse, setPromptResponse] = useState('');

  const handleSubmit = async () => {

    const url = 'http://localhost:4444/api/textPrompt';
    var tmpPromptResponse = '';
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: transcript,
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

  const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
          <div className= "voiceBody">
            <div className="container">
                <header className="voiceHead">Speak your story!</header>
                <br/>
                <p>Converts speech from the microphone to text and makes it available to your React components.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                </div>

                <div style={{order: 3}}>
                <button
                  onClick={handleSubmit}
                >Submit</button>
                </div>

                <div className="content-answer">
                <h3>Streamed Prompt Response:</h3>
                <span>{promptResponse}</span>
                </div>
            </div>
          </div>
          
    );
}

export default Voice;
