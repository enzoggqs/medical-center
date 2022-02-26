import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { api, createSecretarySession, createDoctorSession } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const token = localStorage.getItem("token")

        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, [])

    const secretaryLogin = async (email, password) => {
        const response = await createSecretarySession(email, password);

        const loggedUser = response.data.secretaryAlreadyExist;
        console.log(loggedUser);
        const token = response.data.token

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser)
        navigate("/")
    }

    const doctorLogin = async (email) => {
        const response = await createDoctorSession(email);

        const loggedUser = response.data.doctorAlreadyExist;
        console.log(loggedUser)
        const token = response.data.token

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser)
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login")
    }
    return(
        <AuthContext.Provider 
        value={{authenticated: !!user, user, loading, secretaryLogin, doctorLogin, logout}}
        >
            {children}
        </AuthContext.Provider>
    )
}