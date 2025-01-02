import React, { useState, useEffect } from 'react';
import {cameraProps, ImageDetailsInterface} from '../../utils/interface';
import Camera from '../camera/camera';
import { v4 as uuidv4 } from 'uuid';
import {uploadFiles} from "../../services/uploadFiles";
import {useMessage, getErrorMessage, getSuccessMessage} from '../../utils/messageContext';
import {deleteFile} from '../../services/deleteFile';
import { addComponentToFirebase} from '../../services/addDataToFirebase';
import { useUser } from '../../utils/UserProvider';
import { useNavigate } from 'react-router-dom';
import {getCategoryData} from '../../services/getDataToFirebase';
import styles from "./addNewMeno.module.css";




const AddNewMemo = () => {
    
    const { user } = useUser();
    const navigate = useNavigate();
    const { handleMessage } = useMessage();

    const [showCamera, setShowCamera] = useState(false);
    const [image, setImage] = useState<string | null>(null)
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [showFormFields, setShowFormFields] = useState<boolean>(false);
    const [imageDetails, setImageDetails] = useState<ImageDetailsInterface>
    ({ name: '', category: "", review: ""});
    const [newCategory, setNewCategory] = useState<string>("");
    const [categories, setCategories] = useState<Array<string>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (user) {
                const categoriesData = await getCategoryData(user);
                console.log("Category", categoriesData);
                setCategories(categoriesData);
            }
        }
        fetchCategories();
    }, []);

    const handleImageButton  = ()=>{
        setShowCamera(true);
      }
    function handleImageDetails(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setImageDetails(prevDetails => ({
            ...prevDetails,
            [id]: value
        }));
    }
    function handleCategory(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setNewCategory(value);

        // Update the category in imageDetails when typing in the input
        setImageDetails(prevDetails => ({
            ...prevDetails,
            category: value
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const filename = uuidv4()
        let imagename = null;
        try {
            if (image) {
            imagename= await uploadFiles(image, filename);
            }
            if(user){
            const idComponent = await addComponentToFirebase(
                user, imageDetails, filename);
                if (idComponent) {
                    const message = getSuccessMessage("componentAddedSuccessfully");
                    handleMessage(message);
                    setIsOpen(false);
                }}

        }catch (error:any) {
            // If uploading image failed, delete uploaded image (if uploaded) and show error message
            if (imagename) {
                const message= await deleteFile(filename);
                if (message !== null) {
                handleMessage(message);
                }
            }
            const message = getErrorMessage(error.code);
            handleMessage(message);
        }
        //Clear the form fields after saving the data
        setImageDetails({ name: '', category: "", review: "" });
        navigate("/");
    }
    

    return (
        <div className={styles.addNewMemo} >
            <form onSubmit={handleSubmit}>
                <div className={styles.formSection}>
                    <h2>Lisää uusi muistiinpano</h2>
                    <h3>Valitse kategoria tai lisää uusi kategoria</h3>
                    <div id="category" className={styles.categorySection}>
                        <p className={styles.categoryLabel}>Valitse kategoria</p>
                        <select
                            id="category"
                            value={imageDetails.category ?? ''}
                            onChange={handleImageDetails}
                            className={styles.selectField}
                        >
                            <option value="">Valitse kategoria</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.newCategorySection}>
                        <p className={styles.categoryLabel}>Kirjoita uusi kategoria</p>
                        <input value={newCategory} 
                                type="text" 
                                id="new-category-input"
                                placeholder="Kirjoita uusi kategoria" 
                                onChange={handleCategory} />
                       
                    </div>
                    
                    <h3>Ota kuva</h3>
                    {showCamera ? <Camera setImage={setImage as cameraProps} setShowFormFields={setShowFormFields}/> 
                : <button onClick={handleImageButton}  className={styles.cameraButton}>
                        <img src="\src\assets\images\photo_camera_FILL0_wght400_GRAD0_opsz24.png"  alt="Camera" />
                    </button>}
                </div>
                {showFormFields && (
                    <div className={styles.formFields}>
                        <p className={styles.categoryLabel}>Lisää nimi</p>
                        <input
                            id="name"
                            type="text"
                            placeholder="Kirjoita nimi"
                            value={imageDetails.name ?? ''}
                            onChange={handleImageDetails}
                            className={styles.inputField}
                        />
                        
                        <div>
                            <p className={styles.categoryLabel}>Kirjoita arvostelu</p>
                            <textarea
                                rows={4}
                                cols={40}
                                placeholder="Kirjoita tähän arvostelu"
                                id="review"
                                value={imageDetails.review ?? ''}
                                onChange={handleImageDetails}
                                className={styles.textareaField}
                            ></textarea>
                        </div>
                
                        <input type="submit" value="Tallenna" className={styles.submitButton} />
                    </div>
                )}
                
            </form>
        </div>
    )
}

export default AddNewMemo