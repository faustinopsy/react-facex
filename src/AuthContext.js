import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData)); 
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user'); 
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
