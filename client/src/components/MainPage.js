import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminPage from './AdminPage';
import { AppContext } from './AppContext';
import CommonPage from './CommonPage';

export default function MainPage() {

    const navigate = useNavigate();

    const setToken = useContext(AppContext).setToken;
    const setUserLogged = useContext(AppContext).setUserLogged;

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div></div>
                <div>
                    <button onClick={() => navigate('/admin', { replace: true })}>Admin Page</button>
                    <button onClick={() => navigate('/common', { replace: true })}>Common Page</button>
                </div>
                <div>
                    <button onClick={() => { setToken(''); setUserLogged(false); navigate('/', { replace: true }) }}>Logout</button>
                </div>
            </div>
            <div>
                <Routes>
                    <Route path='/admin' element={<AdminPage />} />
                    <Route path='/common' element={<CommonPage />} />
                </Routes>
            </div>
        </div>
    )
}
