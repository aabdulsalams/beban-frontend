import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import api from "./api";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        authCheck();
    }, []);

    const login = (email, password, callback) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        api.post('/login', formData).then((response) => {
            setUser(response.data.data.user);
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
        api.post('/register', formData).then((response) => {
            setUser(response.data.data.user);
            Cookie.set('token', response.data.data.access_token);
            callback();
        }).catch((error) => {
            if(error.response.data.status === 400){
                alertify.alert('Something Wrong', error.response.data.message);
            }
        })
    }

    const authCheck = async() => {
        if(Cookie.get('token') != null){
            const { data } = await api.get('/api/user');
            setUser(data.data);
        }
    }

    const logout = (callback) => {
        api.get('/logout').then((response) => {
            setUser(null);
            Cookie.remove('token');
            callback();
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <AuthContext.Provider value={{ login, logout, register, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}