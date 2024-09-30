import NavBar from '../NavBar/Navbar';
import { Outlet } from 'react-router-dom';
export default function FixedHeader(){
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    );
}