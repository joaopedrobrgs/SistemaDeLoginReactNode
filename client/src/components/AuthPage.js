import React, { useContext } from 'react'
import { AppContext } from './AppContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {

    const form = useContext(AppContext).form;
    const setForm = useContext(AppContext).setForm;
    const setFormResponse = useContext(AppContext).setFormResponse;

    function showForm() {
      if (form == 'login') {
        return <LoginForm></LoginForm>
      } else if (form == 'register') {
        return <RegisterForm></RegisterForm>
      }
    }

    return (
        <div>
            <div className='pb-2'>
                {showForm()}
            </div>
            <div className='d-flex flex-column align-items-center'>
                <button onClick={() => setForm('login')} className='btn btn-info w-25 mb-2'>Sign-in</button>
                <button onClick={() => setForm('register')} className='btn btn-info w-25 mb-2'>Create your account</button>
            </div>
        </div>
    )
    
}
