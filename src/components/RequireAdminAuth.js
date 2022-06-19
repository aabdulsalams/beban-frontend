import { useLocation, Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useAuth } from "../utils/auth";
import ForbiddenPage from "../pages/403";

const RequireAdminAuth = ({children}) => {
    const token = Cookie.get('token');
    const { user } = useAuth();
    let location = useLocation();

    if(token){
        if(user?.role === 'admin'){
            return children;
        } else if (user?.role === 'user'){
            return <ForbiddenPage />; 
        }
        return null;
    } 
    return <Navigate to="/login" state={{ from: location }} replace />;
}
 
export default RequireAdminAuth;