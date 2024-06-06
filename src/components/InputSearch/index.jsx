/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import styles from './InputSearch.module.css'


function InputSearch({placeholder}) {
    return (
        <div className={styles.group}>            
            <input type="text" required />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label><span className={styles.icon}><SearchOutlined /></span>{placeholder}</label>
        </div>
    );
}

export default InputSearch;