import { storage } from "../firebaseConfig";
import { uploadBytes,ref } from "firebase/storage";



export const uploadFiles = async (base64ImageData: string, filename: string): Promise<string> => {
    try {
        
        // Convert base64-encoded image to a Blob object
        const blob = base64ToBlob(base64ImageData);

        //Create a reference with an initial file path and name
        const storageRef = ref(storage, `images/${filename}`);

        //Send Blob to Firebase Storage
        const snapshot = await uploadBytes(storageRef, blob);

        console.log('Tiedosto lähetetty onnistuneesti:', snapshot.metadata.name);
        return snapshot.metadata.name;
    } catch (error) {
        console.error('Virhe tiedoston lähetyksessä:', error);
        throw error;
    }
};

function base64ToBlob(base64ImageData: string): Blob {
    const byteCharacters = atob(base64ImageData.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'image/jpeg' });
}