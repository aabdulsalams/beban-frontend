import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../utils/auth";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const toggleSidebarButton = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
            document.body.classList.remove('toggle-sidebar');
        } else {
            setSidebarOpen(true);
            document.body.classList.add('toggle-sidebar');
        }
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to='/dashboard' className="logo d-flex align-items-center">
                    <img src="/img/logo-jatim.png" alt="" />
                    <span className="d-none d-lg-block">{process.env.REACT_APP_WEB_NAME}</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" onClick={() => toggleSidebarButton()}></i>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown pe-3">
                        {user ? (
                            <Link to="/dashboard">
                                <i className="ri ri-home-2-line"></i>
                                <span> Home</span>
                            </Link>
                        ) : (

                            <Link to="/login">
                                <i className="ri ri-login-box-line"></i>
                                <span> Login</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>

        </header>
    );
}

export default Header;