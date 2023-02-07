import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext';

export default function CommonPage() {

  const setUserLogged = useContext(AppContext).setUserLogged;
  const jwtResponse = useContext(AppContext).jwtResponse;
  const setJwtResponse = useContext(AppContext).setJwtResponse;
  const token = useContext(AppContext).token;
  const [userValidated, setUserValidated] = useState(false);
  const [data, setData] = useState('');
  const options = {
    method: "GET",
    headers: new Headers({ "content-type": "application/json", 'authorization-token': token })
  }

  useEffect(() => {
    try {
      fetch('/common', options)
        .then(res => res.json())
        .then(json => {
          if (json.status === 200) {
            setUserValidated(true);
            setJwtResponse(json.message)
            setData(json.data)
          } else {
            setUserValidated(false)
            setJwtResponse(json.message)
          }
        })
    } catch (error) {
      console.log(error.message)
      setUserValidated(false);
    }
  }, [])

  
  useEffect(() => {
    if (jwtResponse == 'jwt expired') {
      setUserLogged(false)
    }
  }, [jwtResponse])

  return (
    <div>
      <h3>User informations:</h3>
      {
        userValidated ?
          <ul>
            <li>Name: {data.name}</li>
            <li>Email: {data.email}</li>
            <li>Admin: {data.admin ? <span>true</span> : <span>false</span>}</li>
            <li>Registration Date: {data.createdAt.slice(0, 10)} </li>
          </ul>
          :
          <div>{jwtResponse}</div>
      }
    </div>
  )
}
