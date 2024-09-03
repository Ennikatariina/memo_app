import { useState, useEffect } from 'react';
import {useMessage} from '../../utils/messageContext';
import { useUser } from '../../utils/UserProvider';
import { useParams } from 'react-router-dom';
import {getProductsInCategory} from '../../services/getDataToFirebase'
import {Product} from '../../utils/interface' 
import styles from './selectedCategory.module.css';

const SelectedCategory = () => {
    const { categoryName } = useParams();
    const { user } = useUser();
    const { handleMessage } = useMessage();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProductsInCategory = async () => {
        if (categoryName && user) {
            try {
                const productsData= await getProductsInCategory(user, categoryName);
                setProducts(productsData);
            } catch (error) {
                handleMessage('Error fetching products');
            }
        }
    }

    useEffect(() => {
        fetchProductsInCategory();
    }, [categoryName, user]);

    return (
        <div className="">
            <div>
            <div>
                <h1>{categoryName}</h1>
                {products && Object.keys(products).length > 0 ? (
                    <div>
                        {/* Map through products and render them */}
                        {Object.entries(products).map(([key, product]) => (
                            <div key={key} className={styles.boxContainer}>
                                <div className={styles.imageContainer}>
                                    <img src="\src\assets\images\coffee-placeholder.jpg"/>
                                </div>
                                <div className={styles.textContainer}>
                                    <h3>{product.name}</h3>
                                    <p>{product.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products available</p>
                )}
                </div>
            </div>
        </div>

    )
}

export default SelectedCategory