// ErrorContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast,ToastContainer  } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type MessageContextType = {
    handleMessage: (message: string) => void;
  };

const MessageContext = createContext<MessageContextType>({
    handleMessage: () => {}
  });

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({children}: { children: React.ReactNode }) => {
 //const [message1, setMessage] = useState<string | null>(null);
  const handleMessage = (message:string) => {
   // setMessage(message);
    toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",


      //onClose: () => setMessage(null) // Nullify the error state after the toast is closed
    });
  };

  return (
    <MessageContext.Provider value={{ handleMessage }}>
      {children}
      <ToastContainer />
    </MessageContext.Provider>
  );
};
const errorMessages: { [key: string]: string } = {
  "auth/too-many-requests": "Liian monta kirjautumisyritystä. Yritä hetken kuluttu uudelleen.",
  "auth/invalid-credential": "Sähköpostiosoite tai salasana on väärä. Yritä uudelleen.",
  "missing fields": "Kaikki kentät ovat pakollisia. Täytä puuttuvat tiedot.",
  "missing fields speaker": "Malli ja komponenttien määrä ovat pakollisia. Täytä puuttuvat tiedot.",
  "permission-denied": "Sinulla ei ole oikeuksia tehdä tätä toimintoa.",
};
const successMessages: { [key: string]: string } = {
  "componentAddedSuccessfully": "Komponentti lisätty onnistuneesti",
  "componentGroupAddedSuccessfully": "Komponenttiryhmä lisätty onnistuneesti",
  "SpeakerAddedSuccessfully":"Kauitin lisätty onnistuneesti",
  "quantityAddedSuccessfully": "Määrä lisätty onnistuneesti",
  
};

export const getErrorMessage = (errorCode: string) => {
  return errorMessages[errorCode] || "Jokin meni pieleen, yritä uudelleen.";
};
export const getSuccessMessage = (successCode: string) => {
  return successMessages[successCode] ;
}