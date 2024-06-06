import { Outlet } from 'react-router-dom';
import styles from './Logo.module.css';
import { RocketOutlined } from '@ant-design/icons';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.logo_icon}>
                <RocketOutlined className={styles.rocket_icon} />
            </div>
            <Outlet/>
        </div>
        
    );
}

export default Logo;