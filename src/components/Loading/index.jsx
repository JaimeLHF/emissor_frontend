import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.container}>
            <LoadingOutlined className={styles.loading} />
        </div>
    );
}

export default Loading;