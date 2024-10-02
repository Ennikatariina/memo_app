import { useState, useEffect } from 'react';
import {useMessage} from '../../utils/messageContext';
import { useUser } from '../../utils/UserProvider';
import { useParams } from 'react-router-dom';
import {getProductsInCategory} from '../../services/getDataToFirebase'
import {ProductInterface} from '../../utils/interface' 
import styles from './selectedCategory.module.css';
import { Link } from 'react-router-dom';

const SelectedCategory = () => {
    const { categoryName } = useParams();
    const { user } = useUser();
    const { handleMessage } = useMessage();
    const [products, setProducts] = useState<ProductInterface[]>([]);

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

            <div className={styles.container}>
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
                                <Link to={`/${categoryName}/product/${product.id}`} className={styles.boxLink}>
                                    <h3>{product.name}</h3>
                                </Link>
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

    )
}

export default SelectedCategory