import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children, _user = {} }) => {
    const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'));
    const [user, setUser] = useState({ ..._user });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (email, password) => {
        setLoading(true);

        try{
            const userData = { email, password };
            const response = await axios.post('/api/login', userData);

            const { token } = response.data.success;
            window.sessionStorage.setItem('token', token);
            setIsAuth(true);
            getUserDetails();
        }catch(error){
            setError(error);
        }
    }

    const signup = async (name, email, password, password_confirmation) => {
        setLoading(true);

        try{
            const userData = { name, email, password, password_confirmation };
            const response = await axios.post('/api/register', userData);

            const { token } = response.data.success;
            window.sessionStorage.setItem('token', token);
            setIsAuth(true);
            getUserDetails();
        }catch(error){
            setError(error);
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
            setIsAuth(false);
        }catch(error){
            setError(error);
            console.error(error);
        }
    }

    const value = {
        isAuth,
        user,
        loading,
        error,
        login,
        signup,
        getUserDetails,
        logout
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };