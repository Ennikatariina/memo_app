import { useState } from 'react'
import './App.css'
import LogIn from './components/login/LogIn'
import { useUser } from './utils/UserProvider';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Gategories from './components/gategories/Gategories';
import AddNewMemo from './components/addNewMemo/AddNewMemo';

function App() {
  const{user} = useUser()
 /*  console.log("user app",user) */
  return (
    <>
    {user ? (
      <>
        <Header/>
          
            <Routes>
              <Route path="/" element={<Gategories/>}/>
              <Route path="/addNewMemo" element={<AddNewMemo/>}/>
              
            </Routes>
          
     </>
      ):(
        <LogIn/>
      )} 
      </>
  )
}

export default App
