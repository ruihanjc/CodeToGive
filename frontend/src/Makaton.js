import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function WebcamCapture () {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [promptResponse, setPromptResponse] = useState('');

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
      setImgSrc(imageSrc);
      
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
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Webcam Data to Server</h1>
      <div style={{ margin: 'auto' }}>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <div style={{ margin: 'auto' }}>
        <button
          style={{
            marginTop: '10px',
            fontSize: '20px',
            backgroundColor: '#423fff',
            cursor: 'pointer',
            borderRadius: "10px",
            color: "white",
            padding: "10px"
          }}
          onClick={capture}
        >
          Capture
        </button>
      </div>

      {
        imgSrc !== "" &&
        <div style={{ marginTop: '20px' }}>
          <h2>Captured Image</h2>
          <img src={imgSrc} alt="Captured" style={{ marginTop: '10px' }} />
        </div>
      }

    
                <div className="content-answer">
                <h3>Streamed Prompt Response:</h3>
                <span>{promptResponse}</span>
        
    </div>    
    </div>

   

  );
};

export default WebcamCapture;