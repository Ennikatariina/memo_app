import React from 'react';
import styles from './Login.module.css';
import { useState} from 'react';
//import {useNavigate} from 'react-router-dom';
import Loader from '../loader/loader';
import useFirebaseAuth from '../../services/useFirebaseAuth';

const LogIn = () => {
  const [userCredentials, setUserCredentials] = useState<{email: string; password:string}>({ email: '', password: '' });
  const {isLoading, signIn, passwordResetEmail, getUserRole} = useFirebaseAuth();


  function handleCredentials(e: React.ChangeEvent<HTMLInputElement>):void{
      setUserCredentials({...userCredentials, [e.target.id]: e.target.value});
      //console.log(userCredentials)
  }
  
  async function handleLogin (e: React.FormEvent<HTMLFormElement>): Promise<void>{
      e.preventDefault()
      signIn(userCredentials.email, userCredentials.password)
      console.log("login",userCredentials)
      
  }

  const isValidEmail = (email:string):boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

  function handlePasswordReset():void{
      const email = prompt("Syötä sähköpostiosoitteesi")
      if (email && isValidEmail(email))  {
          passwordResetEmail(email)
      } else {
          alert("Syötä kelvollinen sähköpostiosoite.")
      }
  }
  return (
    <div className={styles.loginContainer}>
      {isLoading && <Loader/>} 
     <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Log In</h1>
        <form className={styles.loginForm} onSubmit={handleLogin}>
            <label htmlFor="email" className={styles.loginLabel}>Email</label>
            <input type="email" id="email" placeholder="Sähköposti" onChange={(e)=>handleCredentials(e)} className={styles.loginInput} />
            <label htmlFor="password" className={styles.loginLabel}>Password</label>
            <input type="password" id="password" placeholder="Salasana"  onChange={(e)=>handleCredentials(e)} className={styles.loginInput} />
            <button type="submit" value="Send" className={styles.loginButton}>Log In</button>
        </form>
        <div className={styles.passwordResetContainer}>
            <p onClick={handlePasswordReset}>Unohditko salasanan?</p>
        </div>
     </div>
    </div>
    
  );
};

export default LogIn;