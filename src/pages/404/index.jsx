import styles from './404.module.css'

function NotFound() {


    return (
        <div className={styles.container}>
            <h1 className={styles.notFound}>Está página ainda não está pronta</h1>
            <p>Se precisar algo me chama no wpp</p>
            <a href='https://wa.me/5549984172509'>Clique Aqui</a>
        </div>
    )
}

export default NotFound;