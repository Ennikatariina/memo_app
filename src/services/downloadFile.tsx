import { storage } from "../firebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const downloadFile = async (filename: string): Promise<string> => {
    try {
        const storageRef = ref(storage, `images/${filename}`);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Virhe tiedoston latauksessa:', error);
        throw error;
    }
}