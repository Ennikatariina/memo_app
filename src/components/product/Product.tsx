import { useState, useEffect } from 'react';
import {useMessage} from '../../utils/messageContext';
import { useUser } from '../../utils/UserProvider';
import { useParams } from 'react-router-dom';
import {ProductInterface} from '../../utils/interface' 
import {getProduct} from '../../services/getDataToFirebase'
import  styles from './product.module.css'

const Product= () => {
    const { productid } = useParams();
    const { categoryName } = useParams();
    const { user } = useUser();
    const [product, setProduct] = useState<ProductInterface[]>([]); 
    const { handleMessage } = useMessage();

console.log(productid)
console.log(categoryName)
console.log(user)
    const fetchProduct = async () => {
        if (productid && user && categoryName) {
            try {
                const productData: ProductInterface[] = await getProduct(user, categoryName ,productid);
                console.log("hyhyh"+productData)
                setProduct(productData);
            } catch (error) {
                handleMessage('Error fetching products');
            }
        }
    }
    useEffect(() => {
        fetchProduct();
        
    }, []);

    if (!product.length) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.productContainer}>
            {product.map((prod) => (
                <div key={prod.id}>
                    <div className={styles.productImage}>
                        <img src="\src\assets\images\coffee-placeholder.jpg"/>
                    </div>
                    <div className={styles.productDetails}>
                        <h3>{prod.name}</h3>
                        <p className={styles.productDescriptio}>{prod.review}</p>
                        <div className={styles.productActions}>
                            <button className={styles.likeButton}>❤️</button>
                            <button className={styles.addToTartButton}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Product