import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default function Layout() {
    return (
        <>
            <ResponsiveNavbar/>
            <Outlet/>
            <Footer />
        </>
    );
}

