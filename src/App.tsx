import { useState } from 'react'
import './App.css'
import LogIn from './components/login/LogIn'
import { useUser } from './utils/UserProvider';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Gategories from './components/categories/Categories';
import AddNewMemo from './components/addNewMemo/AddNewMemo';
import SelectedCategory from './components/selectedCategory/SelectedCategory';

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
              <Route path="/:categoryName" element={<SelectedCategory/>} />
            </Routes>
          
     </>
      ):(
        <LogIn/>
      )} 
      </>
  )
}

export default App
