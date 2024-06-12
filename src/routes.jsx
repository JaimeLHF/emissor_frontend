import { BrowserRouter, Route, Routes } from "react-router-dom";
import './AppRoutes.css';
import { Layout } from "antd";
import SideBar from './components/SideBar';
import { Produtos } from './components/Produtos'
import HeaderNav from "./components/Header";
import PagePadrao from "./pages/Home";
import NotFound from "./pages/404";
import Vendas from "./components/Vendas";
import { Clientes } from "./components/Clientes";
// import Formulariorodutos from "./components/FormProd";
import FormularioAcabamentos from "./components/FormAcab";

const { Content } = Layout;

function AppRoutes() {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar />
                <Layout>
                    <HeaderNav />
                    <Content style={{ margin: '16px' }}>

                        <Routes>
                            <Route path="/" element={<PagePadrao />} />
                            <Route path="/clientes" element={<Clientes />} />
                            <Route path="/produtos" element={<Produtos />} />
                            <Route path="/vendas" element={<Vendas />} />
                            <Route path="*" element={<NotFound />} />



                            <Route path="/produtos/new" element={<FormularioAcabamentos />} />

                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default AppRoutes;
