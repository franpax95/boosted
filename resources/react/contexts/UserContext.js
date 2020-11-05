import React, { useState } from 'react';
import axios from 'axios';
import * as Cookies from "js-cookies";

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const _SESSION = "boosted-session";


    const setSessionCookie = sessionInfo => {
        Cookies.default.removeItem(_SESSION);
        Cookies.default.setItem(_SESSION, sessionInfo, { expires: 14 });
    }

    const getSessionCookie = () => {
        const sessionCookie = Cookies.default.getItem(_SESSION);
        return sessionCookie ? JSON.parse(sessionCookie) : {};
    }

    const removeSessionCookie = () => {
        Cookies.default.removeItem(_SESSION);
    }



    // const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'));
    const [isAuth, setIsAuth] = useState(getSessionCookie().token ? true : false);
    // const [user, setUser] = useState({ ..._user });
    const [user, setUser] = useState(getSessionCookie().user ? getSessionCookie().user : {});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    const login = async (email, password) => {
        setLoading(true);

        try{
            const userData = { email, password };
            const { data: { success: { token, user }}} = await axios.post('/api/login', userData);
            // const config = { headers: { Authorization: `Bearer ${token}` } };
            // const { data: { success: { user }}} = await axios.get('/api/user_detail', config);

            console.log(user, token);

            // const { token } = response.data.success;
            window.sessionStorage.setItem('token', token);

            setSessionCookie(JSON.stringify({ user, token }));
            setIsAuth(true);
            setUser(user);

            // getUserDetails();
        }catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    const signup = async (name, email, password, password_confirmation) => {
        setLoading(true);

        try{
            const userData = { name, email, password, password_confirmation };
            // const response = await axios.post('/api/register', userData);
            const { data: { success: { token, user }}} = await axios.post('/api/register', userData);
            // const config = { headers: { Authorization: `Bearer ${token}` } };
            // const { data: { success: { user }}} = await axios.get('/api/user_detail', config);

            // const { token } = response.data.success;
            window.sessionStorage.setItem('token', token);
            setSessionCookie(JSON.stringify({ user, token }));
            setIsAuth(true);
            // getUserDetails();
        }catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    const getUserDetails = async () => {
        setLoading(true);

        try{
            const token = window.sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/user_detail', config);
            setUser(response.data.success);
            setLoading(false);
        }catch(error){
            console.error(error);
            setError(error);
        }
    }

    const logout = async () => {
        try{
            await axios.post('/api/logout');
            window.sessionStorage.removeItem('token');
            removeSessionCookie();
            setIsAuth(false);
            setUser({});
        }catch(error){
            setError(error);
            console.error(error);
        }
    }

    const token = () => getSessionCookie().token;

    const value = {
        isAuth,
        user,
        loading,
        error,
        login,
        signup,
        getUserDetails,
        logout,
        token
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };