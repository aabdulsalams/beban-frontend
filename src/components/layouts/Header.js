import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../utils/auth";
import useSWR from "swr";
import Cookie from "js-cookie";

const fetcher = url => api.get(url, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then(res => res.data.data)

const Header = () => {
    const { data } = useSWR('/api/user', fetcher)
    const auth = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        auth.logout(() => {
            navigate('/', { replace: true });
        });
        // navigate('/', { replace: true });
        // api.get('/api/logout').then((response) => {
        //     console.log(response)
        //     navigate('/');
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to='/dashboard' className="logo d-flex align-items-center">
                    <img src="/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">TestGIS</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item dropdown pe-3">
                        {/* eslint-disable-next-line */}
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown"> 
                            <img src="/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{data?.name}</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{data?.name}</h6>
                                <span>{data?.email}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-gear"></i>
                                    <span>Account Settings</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                    <i className="bi bi-question-circle"></i>
                                    <span>Need Help?</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                {/* eslint-disable-next-line */}
                                <a className="dropdown-item d-flex align-items-center" href="#" onClick={() => logout()}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </a>
                            </li>

                        </ul>
                    </li>

                </ul>
            </nav>

        </header>
    );
}

export default Header;