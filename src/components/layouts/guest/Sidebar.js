import ActiveLink from "../../ActiveLink";

const Sidebar = () => {

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Menu</li>

                <ActiveLink to="/">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </ActiveLink>

                <ActiveLink to="/rating">
                    <i className="ri ri-star-fill"></i>
                    <span>Ratings</span>
                </ActiveLink>

            </ul>

        </aside>
    );
}

export default Sidebar;