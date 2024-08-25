
import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/UserProvider';
import useFirebaseAuth from '../../services/useFirebaseAuth';


const Logout = () => {
    const {logOut} = useFirebaseAuth();
    const{setUser} = useUser()
    //const navigate = useNavigate()

    const handleLogOut = () => {
        logOut(setUser)
        console.log("Log out")
        //navigate('/login')
    }
    return (
        <div>
            <button onClick={handleLogOut}>KIRJAUDU ULOS</button>
        </div>
    );  
}
export default Logout;