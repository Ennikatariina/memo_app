import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './utils/UserProvider'
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from './utils/messageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MessageProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </MessageProvider>
  </React.StrictMode>,
)
