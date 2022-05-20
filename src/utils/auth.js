import { createContext, useContext } from "react";
import Cookie from "js-cookie";
import api from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {


    const login = (email, password, callback) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        api.get('/sanctum/csrf-cookie').then((response) => {
            api.post('/api/login', formData).then((response) => {
                Cookie.set('token', response.data.data.access_token);
                // console.log(response.data);
                // setUser(response.data.data.user);
                callback();
            }).catch((error) => {
                console.error(error);
                console.log("Credentials Invalid");
            })
        })
    }

    const register = (name, email, password, callback) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        api.post('/api/register', formData).then((response) => {
            Cookie.set('token', response.data.data.access_token);
            // console.log(response.data);
            // setUser(response.data.data.user);
            callback();
        }).catch((error) => {
            console.error(error);
            console.log("Credentials Invalid");
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