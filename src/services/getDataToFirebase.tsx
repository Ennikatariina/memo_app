import {db} from '../firebaseConfig';
import { collection, getDocs,doc, getDoc, DocumentData} from "firebase/firestore"; 
import { ProductInterface } from '../utils/interface';


export const getCategoryData = async (userId:string) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const data = userDocSnapshot.data();
            const subCollectionNames = data.subCollectionNames || [];
            return subCollectionNames;
        } else {
            console.log("Dokumenttia ei löytynyt!");
            return [];
        }
    } catch (e) {
        console.error("Virhe haettaessa dokumenttia:", e);
        return [];
    }
};


    export const getNumberOfProductsInCategory = async (userId:string) => {
        try {
            // Hae käyttäjän dokumentti
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);
    
            if (!userDocSnapshot.exists()) {
                console.error("Käyttäjän dokumenttia ei löytynyt!");
                return 0;
            }
    
            // Hae alikokoelmat käyttäjän dokumentista
            const subCollections: string[] = await listCollections(userDocRef);
            let totalProducts: {[key: string]: string|number} = {};
    
            // Käy läpi jokainen alikokoelma ja laske tuotteiden määrä
            for (const subCollectionName of subCollections) {
                const subCollectionRef = collection(db, "users", userId, subCollectionName);
                const subCollectionSnapshot = await getDocs(subCollectionRef);
                const productCount = subCollectionSnapshot.size;
                // Tallenna tulokset objektiin
                totalProducts[subCollectionName] = productCount;
            }
            return totalProducts;
        } catch (e) {
            console.error("Virhe haettaessa tuotteiden määrää:", e);
            return 0;
        }
    };
    async function listCollections(docRef:any) {
        const userDocSnapshot = await getDoc(docRef);
        const data = userDocSnapshot.data() as { subCollectionNames?: string[] };
        return data?.subCollectionNames || []; 
    }


export const getProductsInCategory = async (userId:string, category:string) => {
    try {
        const categoryCollectionRef = collection(db, "users", userId, category);
        const categoryCollectionSnapshot = await getDocs(categoryCollectionRef);
        const products: ProductInterface[] = categoryCollectionSnapshot.docs.map(doc => {
            const data = doc.data() as DocumentData;
            return {
                id: doc.id,
                name: data.name,
                review: data.review,
                category: data.category,
                filename: data.filename,
            } as ProductInterface;
        });
        return products;
    } catch (e) {
        console.error("Virhe haettaessa dokumenttia:", e);
        return [];
    }}

    export const getProduct = async (userId:string,category:string, productId:string) => {
        try {
            const productDocRef = doc(db, "users", userId, category, productId);
            const productDocSnapshot = await getDoc(productDocRef);
    
            if (!productDocSnapshot.exists()) {
                console.error("Tuotetta ei löytynyt!");
                return [];
            }
            const data = productDocSnapshot.data();
            console.log(productDocSnapshot.id,
                data.name,
                data.review,
               data.category,
                data.filename,)
            return [{
                id: productDocSnapshot.id,
                name: data.name,
                review: data.review,
                category: data.category,
                filename: data.filename,
            }];
        } catch (e) {
            console.error("Virhe haettaessa dokumenttia:", e);
            return [];
        }
}