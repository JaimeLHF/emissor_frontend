/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import styles from './InputSearch.module.css'


function InputSearch({ placeholder, onSearch }) {
    
    const handleChange = (event) => {
        const { value } = event.target;
        onSearch(value);
    };

    return (
        <div className={styles.group}>
            <input type="text" placeholder={placeholder} onChange={handleChange} />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label_lupa}><span className={styles.icon}><SearchOutlined /></span>{placeholder}</label>
        </div>
    );
}


export default InputSearch;