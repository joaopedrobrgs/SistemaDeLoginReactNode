import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext';

export default function AdminPage() {

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
      fetch('/admin', options)
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
      setUserValidated(false)
    }
  }, [])


  useEffect(() => {
    if (jwtResponse == 'jwt expired') {
      setUserLogged(false)
    }
  }, [jwtResponse])

  return (
    <div>
      <h3>List of Users:</h3>
      {
        userValidated ?
          <ul>
            {data.map((element, index) => {
              return (
                <li key={index}>
                  Name: {element.name}
                  <br></br>
                  Email: {element.email}
                  <br></br>
                  Registration Date: {element.createdAt.slice(0, 10)}
                  <br></br>
                  Admin: {element.admin ? <span>true</span> : <span>false</span>}
                </li>
              )
            })}
          </ul>
          :
          <div>{jwtResponse}</div>
      }
    </div>
  )
}
