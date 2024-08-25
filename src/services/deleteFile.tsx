import {ref, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig";
import {getErrorMessage} from '../utils/messageContext';

export const deleteFile =  async (filename: string): Promise<string|null> => {
    try {
        const desertRef = ref(storage, 'images/'+filename);
        // Delete the file
        
            await deleteObject(desertRef);
            console.log("File deleted successfully");
            return null;
    } catch (error:any) {
        const message = getErrorMessage(error.code);
        console.error("Error deleting file unjuju: ", error.code);
        return message;
    }
}