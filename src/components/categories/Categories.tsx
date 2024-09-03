import { useState, useEffect } from 'react';
import {useMessage} from '../../utils/messageContext';
import { useUser } from '../../utils/UserProvider';
import {getCategoryData, getNumberOfProductsInCategory} from '../../services/getDataToFirebase'
import styles from './Categories.module.css';
import { Link } from 'react-router-dom';

type CategoriesType = {
    [key: string]: number;
};

const Categories = () => {
    const { user } = useUser();
    const { handleMessage } = useMessage();
    
    const [categories, setCategories] =useState<CategoriesType>({});

    useEffect(() => {
        const fetchNumberOfProductsInCategory = async () => {
            if (user) {
                const amountOfCategories = await getNumberOfProductsInCategory(user) as CategoriesType;
                setCategories(amountOfCategories);
            }
        };
        fetchNumberOfProductsInCategory();
    }, [user]);


  
    return (
        <div>
            <div className={styles.categoriaContainer}>
                <h2>Kategoriat</h2>
            </div>
            <div className={styles.categoriaContainer}>
                {/* Render categories here */}
                {categories && Object.keys(categories).length > 0 ? (
                    Object.entries(categories).map(([category, count], index) => (
                            <div key={index} className={styles.boxContainer}>
                                <Link to={`/category/${category}`} className={styles.boxLink}>
                                    <div className={styles.imageContainer}>
                                        <img src="\src\assets\images\coffee-placeholder.jpg" alt="placeHolder" />
                                    </div>
                                    <div >
                                        <p className={styles.headerText}>{category}</p>
                                        <p className={styles.countText}>({count})</p>
                                    </div>
                                </Link>
                            </div>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        </div>
    );
}

export default Categories