import { useEffect,useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";
import {auth, db} from '../firebaseConfig';
import { useUser } from '../utils/UserProvider';
import {signOut, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import {useMessage,getErrorMessage } from '../utils/messageContext';



interface FirebaseAuthFunction {
    isLoading: boolean;
    signIn: (email: string, password: string) => void;
    logOut: (setUser: React.Dispatch<React.SetStateAction<string | null>>) => void;
    passwordResetEmail: (email: string) => void;
    getUserRole: (user:string) => Promise<string | undefined>;

}

const useFirebaseAuth = ():FirebaseAuthFunction => {
    const{user, setUser, role, setRole} = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const { handleMessage } = useMessage();
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser ? currentUser.uid : null);
            setIsLoading(false);
        });
        
        return () => {
            unsubscribe();
        };
        }, []);

    useEffect(() => {
        if (user){
        getUserRole(user as string)
        console.log("useEffect role",role)
        } else{
            setRole(null)
        }
    }, [user]);

    //SING IN
    const signIn = async (email: string, password: string) => {
        console.log("sign in")
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error:any) {
            const message = getErrorMessage(error.code);
            handleMessage(message);
        }
      };

      // Get user's role from Firebase
      const getUserRole = async (user:string): Promise<string | undefined> => {
        try {
            const userDocRef = doc(db, "users", user);
            const userDoc = await getDoc(userDocRef);
            if(userDoc.exists()){
                const userRole = userDoc.data()?.roles;
                console.log("userRole",userRole)
                setRole(userRole);
                return userRole; 
            }   
        }
        catch (error) {
            console.error("Error fetching user role:", error);
          }
        }


   /*  const signIn = async(email:string, password:string) => {

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user.uid);
            })
            .catch((error) => {
                let message = "";
                if(error.code === "auth/too-many-requests"){
                    message = "Liian monta kirjautumisyritystä. Yritä hetken kuluttu uudelleen.";  
                }
                else{
                    message = "Sähköpostiosoite tai salasana on väärä. Yritä uudelleen.";
                }
                handleMessage(message);
            })}; */


    //LOG OUT
    const logOut = (setUser: React.Dispatch<React.SetStateAction<string | null>>) => {

        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            const message = getErrorMessage(error.code);
            handleMessage(message);
        });
    
    }
    //SEND PASSWORD RESET EMAIL
    const passwordResetEmail = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            const message = `Salasanan palautusviesti lähetetty onnistuneesti käyttäjälle: ${email}`;
            handleMessage(message);
        } catch (error:any) {
            console.log(error.code)
            console.log(error)
            const message = getErrorMessage(error.code);
            handleMessage(message);
        }
      };
    return { isLoading, signIn, logOut, passwordResetEmail, getUserRole};
}

export default useFirebaseAuth;