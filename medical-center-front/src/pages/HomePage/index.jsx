import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { AuthContext } from "../../contexts/auth";

import { getDoctors } from "../../services/api";

const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext)
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await getDoctors();
            setDoctors(response.data.doctors);
            setLoading(false);
        })();
    }, [])

    const handleLogout = () => {
        logout();
    }

    if(loading) {
        <div className="loading">Carregando dados</div>
    }

    return (
        <>
            <h1>HomePage</h1>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.id} -
                        {doctor.email} -
                        {doctor.name}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default HomePage;