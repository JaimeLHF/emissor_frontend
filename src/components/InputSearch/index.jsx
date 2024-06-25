/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import styles from './InputSearch.module.css';

function InputSearch({ placeholder, onSearch }) {
    const handleChange = (event) => {
        const { value } = event.target;
        onSearch(value);
    };

    return (
        <div className={styles.search_container}>
            <input 
                type="text" 
                id='input_search' 
                className={styles.search_input} 
                placeholder={placeholder} 
                onChange={handleChange} 
            />
            <label htmlFor="input_search" className={styles.search_button}>
                <SearchOutlined />
            </label>
        </div>
    );
}

export default InputSearch;
