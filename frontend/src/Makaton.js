import Webcam from "react-webcam";

import { useCallback, useRef, useState } from "react"; // import useCallback




const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [mirrored, setMirrored] = useState(false);
  
  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    
  }, [webcamRef]);



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    
    const Upload = async() => {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {console.log(data)})
      })
    }
    Upload();
  }





  const retake = () => {
    setImgSrc(null);
  };

    return (
        <div className="container">
            {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
            ) : (
            <Webcam height={600} width={600} ref={webcamRef} mirrored={true} />
            )}
        
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={handleSubmit}>Update photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
    );
};

export default CustomWebcam;