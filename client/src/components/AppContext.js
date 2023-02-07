import React, { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider(props) {
    const [userLogged, setUserLogged] = useState(false);
    const [token, setToken] = useState('');
    const [form, setForm] = useState('login');
    const [formResponse, setFormResponse] = useState('');
    const [jwtResponse, setJwtResponse] = useState('');
    return (
        <AppContext.Provider value={
            {
                userLogged, setUserLogged,
                token, setToken, 
                form, setForm,
                formResponse, setFormResponse,
                jwtResponse, setJwtResponse,
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };


