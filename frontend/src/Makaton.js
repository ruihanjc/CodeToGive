import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Makaton.css'; 

function WebcamCapture () {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [promptResponse, setPromptResponse] = useState('');
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance()
    

    const speechHandler = (msg) => {
      msg.text = ourText
      window.speechSynthesis.speak(msg)
    }

  const capture = async () => {
    const url = 'http://localhost:4444/api/upload-image'
    const imageSrc = webcamRef.current.getScreenshot();
    var tmpPromptResponse = '';
    try {
    //   const response = axios.post('http://localhost:4444/api/upload-image', { image: imageSrc }, 
    //     {
    //         headers: {
    //             'Content-Type': 'image/*'
    //         }
    //     }
    //   )

    const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'image/*'
        },
        body: {image: imageSrc},
      });
      
      
      // eslint-disable-next-line no-undef

      
      let decoder = new TextDecoderStream();
      if (!response.body) {
        console.log("Hello")
        return;
      }
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
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <header className="voiceHead">Record your story!</header>   
      <h1>_</h1>
      <h1>_</h1>
      <div style={{ margin: 'auto' }}>
        <Webcam audio={false} ref={webcamRef} mirrored ='True' screenshotFormat="image/jpeg" />
      </div>
      <div style={{ margin: 'auto' }}>
        <button
          style={{
            marginTop: '10px',
            fontSize: '20px',
            backgroundColor: '#fffff',
            cursor: 'pointer',
            borderRadius: "10px",
            color: "#007bff",
            padding: "10px"
          }}
          onClick={capture}
        >
          Capture Your Sign
        </button>
      </div>
      <h1>_</h1>
      {
        imgSrc !== "" &&
        <div style={{ marginTop: '20px' }}>
          <h2>Captured Image</h2>
          <img src={imgSrc} alt="Captured" style={{ marginTop: '20px', marginBot: '10px' }} />
        </div>
      }

      <h4></h4>
    
      <div className="video-content-answer">
          <h3>Here's your story:</h3>
          <span>{promptResponse}</span>
      </div>

      <h1>Hear the story wtih us!</h1>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>    
    </div>

   

  );
};

export default WebcamCapture;