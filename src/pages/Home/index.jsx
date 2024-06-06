import { Outlet } from 'react-router-dom'
import Logo from '../../components/Logo'

export default function PagePadrao() {
    return (
        <main>
            <Logo />
            
            <Outlet />
        </main>
    )
}