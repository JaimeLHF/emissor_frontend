import { HeartFilled } from '@ant-design/icons';
import styles from './heart.module.css';

const Heart = () => {
  return (
    <div className={styles.heartContainer}>
      <div className={styles.heart}><HeartFilled /></div>
      <div>
        <p>Happy Valentine's Day</p>
        <p>I really Love you!</p>
      </div>
    </div>
  );
};

export default Heart;
