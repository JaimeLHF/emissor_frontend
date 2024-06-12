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
import Heart from "./components/Namorados";

const { Content } = Layout;

function AppRoutes() {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>

                <Routes>
                    <Route path="/produtos/new/namorados" element={<Heart />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default AppRoutes;
