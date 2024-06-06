/* eslint-disable react/prop-types */
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './ButtonAdd.module.css'
import { Link } from 'react-router-dom';

function ButtonAdd({ text, to }) {

    return (
        <Link to={to}> <button className={styles.btn}><span className={styles.icon}><PlusCircleOutlined /></span>{text}</button></Link>
    );
}

export default ButtonAdd;