import { HomeOutlined, PieChartOutlined, SmileOutlined, MailOutlined, AppstoreOutlined, TruckOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import styles from './SidebarMenu.module.css';

const { Sider } = Layout;

const items = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: 'Home',
    },
    {
        key: '/vendas',
        icon: <PieChartOutlined />,
        label: 'Vendas',
    },
    {
        key: '/clientes',
        icon: <SmileOutlined />,
        label: 'Clientes',
    },
    {
        key: '/produtos',
        icon: <AppstoreOutlined />,
        label: 'Produtos',
    },
    {
        key: '/emitente',
        icon: <MailOutlined />,
        label: 'Emitente',
    },
    {
        key: '/transportadoras',
        icon: <TruckOutlined />,
        label: 'Transportadoras',
    },
];

const SideBar = () => {

    const localizacao = useLocation();

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const onMenuClick = (item) => {
        navigate(item.key);
    };

    const getBasePath = (pathname) => {
        const parts = pathname.split('/');
        const defaultSelected = parts.length > 2 ? `/${parts[1]}` : pathname;
        return defaultSelected;
    };

    return (
        <Sider
            className={styles.collapsed_aside}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className={styles.menu_collapse}>

                <Logo />

                <Menu
                    theme="dark"
                    defaultSelectedKeys={[getBasePath(localizacao.pathname)]}
                    mode="inline"

                    items={items}
                    onClick={onMenuClick}
                />
            </div>
        </Sider >
    );
};

export default SideBar;
