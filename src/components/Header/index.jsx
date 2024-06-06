import styles from './HeaderNav.module.css'
import { Layout, theme } from 'antd';
const { Header } = Layout;

function HeaderNav() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header className={styles.header_nav} style={{ padding: 0, background: colorBgContainer, }}>
                <h1 className={styles.titulo}>Fucking System</h1>
            </Header>
        </Layout>
    )
}

export default HeaderNav;