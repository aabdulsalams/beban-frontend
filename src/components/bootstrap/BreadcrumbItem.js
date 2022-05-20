import { Link } from "react-router-dom";

const BreadcrumbItem = ({ href, text, active }) => {
    if(href){
        return ( 
            <li className={active ? 'breadcrumb-item active' : 'breadcrumb-item'}><Link to={href}>{text}</Link></li>
        );
    } 
    return ( 
        <li className={active ? 'breadcrumb-item active' : 'breadcrumb-item'}>{text}</li>
    );
}
 
export default BreadcrumbItem;