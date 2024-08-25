import styles from './loader.module.css'

interface LoaderProps {
    bg?: string;
}

const Loader: React.FC<LoaderProps> = ({ bg }) => {
    
    return (
        <>  
        <div style={{ backgroundColor: bg ? bg : ''}} className={styles.full_page_loader}>
            <div className={styles.lds_dual_ring}></div>
        </div> 

        </>
    )
}

export default Loader