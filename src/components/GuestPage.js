import { useLocation, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const GuestPage = ({children}) => {
    const token = Cookie.get('token');
    let location = useLocation();

    if(token){
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
    return children;
}
 
export default GuestPage;