import { createContext, useContext } from "react";
import Cookie from "js-cookie";
import api from "./api";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const login = (email, password, callback) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        api.post('/api/login', formData).then((response) => {
            Cookie.set('token', response.data.data.access_token);
            callback();
        }).catch((error) => {
            if(error.response.data.status === 401){
                alertify.alert('Something Wrong', 'Invalid email or password');
            } else if(error.response.data.status === 400){
                alertify.alert('Something Wrong', error.response.data.message);
            }
        })
    }

    const register = (name, email, password, callback) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        api.post('/api/register', formData).then((response) => {
            Cookie.set('token', response.data.data.access_token);
            callback();
        }).catch((error) => {
            if(error.response.data.status === 400){
                alertify.alert('Something Wrong', error.response.data.message);
            }
        })
    }

    const logout = (callback) => {
        api.get('/api/logout', { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then((response) => {
            Cookie.remove('token');
            callback();
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <AuthContext.Provider value={{ login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}