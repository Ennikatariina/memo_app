import {db} from '../firebaseConfig';
import { collection, addDoc, doc,setDoc, arrayUnion} from "firebase/firestore"; 
import {ImageDetailsInterface} from '../utils/interface';
import {getSuccessMessage, getErrorMessage} from '../utils/messageContext';


/* 
export const addDataToFirebase = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, "users", user, "categories"), {
            ...data
        });
        console.log("Document written with ID: ", docRef.id);
        getSuccessMessage("Data added successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
        getErrorMessage("Error adding document");
    }
} */

// Lisää alikokoelman nimi käyttäjän dokumenttiin
const addSubcollectionNameToUserDoc = async (userId:string, subcollectionName:string) => {
    try {
        const userDocRef = doc(db, "users", userId);

        // Päivitä käyttäjän dokumenttia lisäämällä alikokoelman nimi
        await setDoc(userDocRef, {
            subCollectionNames: arrayUnion(subcollectionName) // Lisää nimi vain, jos sitä ei vielä ole
        }, { merge: true }); // Merge=true säilyttää muut kentät

        console.log(`Alikokoelma '${subcollectionName}' lisätty dokumenttiin '${userId}'.`);
    } catch (e) {
        console.error("Virhe päivitettäessä dokumenttia:", e);
    }
};



export const addComponentToFirebase = async (user: string, imageDetails: ImageDetailsInterface, filename: string) => {
    try {
        if (!imageDetails.category) {
            throw new Error("Category is required");
        }
        console.log("Attempting to add document with the following details:", { user, imageDetails, filename });

        // Viittaa oikeaan kokoelmaan käyttäjän dokumentissa
        const categoryCollectionRef = collection(db, "users", user, imageDetails.category);
        
        // Luo uusi dokumentti alikokoelmaan
        const docRef = await addDoc(categoryCollectionRef, {
            name: imageDetails.name,
            review: imageDetails.review,
            filename: filename,
            category: imageDetails.category
        });
        console.log("Document written with ID: ", docRef.id);

        // Lisää alikokoelman nimi käyttäjän dokumenttiin
        await addSubcollectionNameToUserDoc(user, imageDetails.category);

        getSuccessMessage("Component added successfully");
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        getErrorMessage("Error adding document");
    }
};

