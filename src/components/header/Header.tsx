import { useState } from 'react';
import { Link} from 'react-router-dom';
import styles from './header.module.css'
import Logout from '../logout/Logout';

function MobileMenuItems() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    return (
        <div className={styles.mobileMenu}>
            {isMenuOpen ? (<img src="\src\assets\images\close_FILL0_wght400_GRAD0_opsz24.png" alt="Menu" className={styles.hamburgerIcon} onClick={toggleMenu} />
            ):(
            <img src="\src\assets\images\menu_FILL0_wght400_GRAD0_opsz24.png" alt="Menu" className={styles.hamburgerIcon} onClick={toggleMenu} />
            )}
            {isMenuOpen && (
            <ul className={styles.mobileList}>
                <li><Link to="/addNewMemo" onClick={closeMenu}>Lisää muistiinpano</Link></li>
                <div className={styles.logoutButton}>
                <Logout />
                </div>
            </ul>)}
            {/* <Link to="/">
                <img src="\src\assets\home_FILL0_wght400_GRAD0_opsz24.png" alt="Menu" className={styles.homeIcon}/>
            </Link> */}
            <div className={styles.logoutContainer}>
            <Link to="/" className={styles.linkText}> Asiat muistiin</Link>
            </div>
            {/* <div className={styles.logoutButton}>
                <Logout />
            </div> */}
        </div>
    );
}

function Header() {
    

    return (
        <div className={styles.container}>
            
        <nav className= {styles.navBarContainer}>   
        <MobileMenuItems />
            <div className={styles.headerContent}>
                <h2 className={styles.logo}><Link to="/">Asiat muistiin</Link></h2>
                <ul className={styles.horizontal_list}>
                    <li><Link to="/addNewMemo">Lisää muistiinpano</Link></li>
                    <li><Logout /></li>
                </ul>
            </div>
        </nav>
        </div>
    );
}

export default Header;