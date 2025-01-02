import { useState, useEffect } from 'react';
import {useMessage} from '../../utils/messageContext';
import { useUser } from '../../utils/UserProvider';
import { useParams } from 'react-router-dom';
import {ProductInterface} from '../../utils/interface' 
import {getProduct} from '../../services/getDataToFirebase'
import {downloadFile} from '../../services/downloadFile'
import  styles from './product.module.css'

const Product= () => {
    const { productid, categoryName } = useParams();
    const { user } = useUser();
    const [product, setProduct] = useState<ProductInterface[]>([]); 
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const { handleMessage } = useMessage();

    const fetchProduct = async () => {
        if (productid && user && categoryName) {
            try {
                const productData: ProductInterface[] = await getProduct(user, categoryName ,productid);
                setProduct(productData);
            } catch (error) {
                handleMessage('Error fetching products');
            }
        }
    }
    useEffect(() => {
         fetchProduct();

    }, []);

    useEffect(() => {
        const fetchFileUrl = async () => {
            if (product.length > 0) {
                const filename = product[0]?.filename;
                if (filename) {
                    try {
                        const url = await downloadFile(filename);
                        setFileUrl(url);
                    } catch (error) {
                        handleMessage('Error downloading file');
                    }
                }
            }
        };

        fetchFileUrl();
    }, [product]);
    
    if (!product.length) {
        return <p>Loading...</p>;
    }
 
    return (
        <div className={styles.productContainer}>
            {product.map((prod) => (
                <div key={prod.id}>
                    <div className={styles.productImage}>
                    <img src={fileUrl ?? ''} alt={product[0].filename} />    
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