import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import Authentication from "./routes/AuthRoute";
import HomePage from "./routes/home/Home";
import { useEffect, useState } from "react";
import CredentialContext from "./credentialsContext";
import Login from "./routes/Login";

let storage = window.localStorage;

const RouteSwitch = () => {
  const serverLink = 'http://localhost:9000';

  const [credentials, setCredentials] = useState(() => {
    return storage.getItem('credentials') ? JSON.parse(storage.getItem('credentials')) : null
  })

  const context = {
    setState: {
      credentials: credentials,
      function: setCredentials,
    },
    serverLink: serverLink
  }

  useEffect(() => {
    if (credentials === null) {
      request();
    }
  }, []);


  async function request() {
    try {
      const getUserCredentials = await fetch(serverLink + '/home', {
        credentials: 'include',
      })
        .then(response => response.json());

      if (getUserCredentials !== credentials) {
        storage.setItem('credentials', JSON.stringify(getUserCredentials))
        setCredentials(getUserCredentials)
      }
    } catch (error) {
      return null;
    }
  }

  return (
    <CredentialContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-up" element={<Authentication />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CredentialContext.Provider>
  )
}

export default RouteSwitch;