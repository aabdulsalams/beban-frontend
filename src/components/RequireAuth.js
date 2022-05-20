import { useLocation, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const RequireAuth = ({children}) => {
    const token = Cookie.get('token');
    let location = useLocation();

    if(token){
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
}
 
export default RequireAuth;