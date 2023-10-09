
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import './Voice.css'; 


function Voice() {
  const [promptResponse, setPromptResponse] = useState('');
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance()
    

    const speechHandler = (msg) => {
      msg.text = ourText
      window.speechSynthesis.speak(msg)
    }


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
          setOurText(tmpPromptResponse)
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

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
          <div className= "voiceBody">
            <div className="container">
                <header className="voiceHead">Tell your story!</header>
                
                <h>_</h>
                
                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="voice-btn-style">
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                </div>

                

                <div className="content-answer">
                <h3>Here's your story:</h3>
                <span>{promptResponse}</span>
                </div>

                <h1>Hear the story wtih us!</h1>
                <button onClick={() => speechHandler(msg)}>SPEAK</button>
            </div>
          </div>
          
    );
}

export default Voice;
