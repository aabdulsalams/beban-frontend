import ActiveLink from "../ActiveLink";
import { useAuth } from "../../utils/auth";

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Menu</li>

                <ActiveLink to="/dashboard">
                    <i className="ri ri-map-2-fill"></i>
                    <span>Maps</span>
                </ActiveLink>

                <ActiveLink to="/disasters">
                    <i className="ri ri-map-pin-2-fill"></i>
                    <span>Disaster Locations</span>
                </ActiveLink>

                {user?.role === 'admin' ? (
                    <ActiveLink to="/disaster-types">
                        <i className="ri ri-flood-fill"></i>
                        <span>Disaster Types</span>
                    </ActiveLink>
                ) : null}

                <ActiveLink to="/rating">
                    <i className="ri ri-star-fill"></i>
                    <span>Ratings</span>
                </ActiveLink>

            </ul>

        </aside>
    );
}

export default Sidebar;