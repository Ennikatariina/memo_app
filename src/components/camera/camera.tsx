import React, {useState} from "react";
import Webcam from "react-webcam";
/* import {uploadFiles} from "../../services/uploadFiles"; */
import styles from './camera.module.css';
import {CameraProps} from '../../utils/interface';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };
  
  const Camera :  React.FC<CameraProps> = ({ setImage, setShowFormFields }) => {
    const [cameraVisible, setCameraVisible] = useState<boolean>(true);
    const webcamRef = React.useRef<Webcam | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = React.useCallback(
        () => {
            if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                /* if (imageSrc) {
                    fetch(imageSrc)
                      .then(res => res.blob())
                      .then(blob => {
                        const file = new File([blob], 'screenshot.jpg', { type: 'image/jpeg' });
                        //uploadFiles(file);
                      });
                  } */
                setImage(imageSrc);
                setImgSrc(imageSrc);
                setCameraVisible(false);
                setShowFormFields(true);
            }
        },
        [webcamRef]
    );


    return (
     
      <div className={styles.webcamContainer}>
        {cameraVisible ?(<>
        <Webcam
          audio={false}
          height={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        <button onClick={capture}>Ota kuva</button>
        </>):(
          <>
          {imgSrc && (
            <img
              src={imgSrc}
              className="capturedImage"
            />
          )}
          </>
        )}
        
    
        </div>
    );
  };
  export default Camera;