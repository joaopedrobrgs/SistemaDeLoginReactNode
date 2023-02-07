import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext';

export default function RegisterForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState('');
  const formResponse = useContext(AppContext).formResponse;
  const setFormResponse = useContext(AppContext).setFormResponse;
  const setJwtResponse = useContext(AppContext).setJwtResponse;
  const form = useContext(AppContext).form;
  const setForm = useContext(AppContext).setForm;

  useEffect(()=>{
    setFormResponse('');
    setJwtResponse('');
  },[])

  useEffect(() => {
    setOptions({
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ name, email, password }),
    })
  }, [name, email, password])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('/user/register', options)
        .then(res => res.json())
        .then((data) => {
          if (data.status === 200) {
            alert(data.message);
            setFormResponse('');
            setName('');
            setEmail('');
            setPassword('');
            setForm('login');
          } else {
            setFormResponse(data.message);
          }
        })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h3 className='text-center'>Create your account</h3>
      <form className='d-flex flex-column align-items-center' method='POST' action='/user/register' onSubmit={(e) => handleSubmit(e)}>
        <input type='text' className='w-50' name='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type='email' className='w-50' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type='password' className='w-50' name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className='w-50'>Register</button>
        {formResponse ? <div className='alert alert-danger text-center w-50 mb-0 mt-2'>{formResponse}</div> : <div></div>}
      </form>
    </div>
  )
}
