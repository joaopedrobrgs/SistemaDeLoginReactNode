import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

export default function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState('');
  const token = useContext(AppContext).token;
  const setToken = useContext(AppContext).setToken;
  const jwtResponse = useContext(AppContext).jwtResponse;
  const formResponse = useContext(AppContext).formResponse;
  const setFormResponse = useContext(AppContext).setFormResponse;

  useEffect(()=>{
    setFormResponse('');
  },[])

  useEffect(() => {
    setOptions({
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ email, password }),
    })
  }, [email, password])

  useEffect(() => {
    if (jwtResponse == 'jwt expired') {
      setFormResponse('Token expired')
    }
  }, [jwtResponse])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('/user/login', options)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status === 200) {
            alert(data.message);
            setToken(data.token)
            setFormResponse('');
            setEmail('');
            setPassword('');
            navigate('/', { replace: true });
          } else {
            setFormResponse(data.message);
          }
        })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className=''>
      <h3 className='text-center'>Sign-in</h3>
      <form className='d-flex flex-column align-items-center' method='POST' action='/user/login' onSubmit={(e) => handleSubmit(e)}>
        <input type='email' className='w-50' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type='password' className='w-50' name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className='w-50'>Login</button>
        {formResponse ? <div className='alert alert-danger text-center w-50 mb-0 mt-2'>{formResponse}</div> : <div></div>}
      </form>
    </div>
  )
}
