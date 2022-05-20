import { Link, useMatch, useResolvedPath } from "react-router-dom";

const ActiveLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: false });

    return (
        <li className="nav-item">
            <Link to={to} className={match ? 'nav-link' : 'nav-link collapsed'}>
                { children }
            </Link>
        </li>
    );
}

export default ActiveLink;