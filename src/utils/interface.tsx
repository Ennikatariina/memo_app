export interface cameraProps {
    (src: string | null): void;
  }

  export interface WebcamCaptureProps {
    setImage: cameraProps;
    setShowFormFields:React.Dispatch<React.SetStateAction<boolean>>;
  }
 
  export interface CameraProps {
    setImage: (image: string | null) => void;
    setShowFormFields: (show: boolean) => void;
}
export interface ImageDetailsInterface {
  name: string, 
  category: string, 
  review: string|null,

  
}