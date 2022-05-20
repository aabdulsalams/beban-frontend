import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                { children }
            </main>
            <Footer />
        </>
    );
}

export default Layout;