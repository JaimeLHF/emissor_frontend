import { HomeOutlined, PieChartOutlined, DesktopOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons';
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
        icon: <DesktopOutlined />,
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
        icon: <AppstoreOutlined />,
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

    // Encontre a chave que corresponde à localizacao.pathname
    const selectedKey = items.find((item) => {
        const regex = new RegExp(`${item.key}/([^/]+)`);
        return regex.test(localizacao.pathname);
    })?.key || '/';

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <Logo />
            <Menu
                className={collapsed ? styles.collapsed : styles.sider_fixed}
                theme="dark"
                defaultSelectedKeys={[selectedKey]}
                mode="inline"
                items={items}
                onClick={onMenuClick}
            />
        </Sider>
    );
};

export default SideBar;
