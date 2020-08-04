import React, { useEffect, useState } from 'react';


class FlaskRequests {
  constructor(user_token) {
    this.endpoint = "http://localhost:3000/api/";
    this.token = user_token; // could do this to automate auth for those requests
  }
}

export const postRequest = async (endpoint, data) => {
  const params = {
    method: "POST",
    mode: "cors",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  const response = await fetch(`http://127.0.0.1:5000/api/${endpoint}`, params);
  console.log(endpoint);
  const result = await response.json()
  console.log("result", result)
  return result;
}

export const getRequest = async (endpoint) => {
  console.log(endpoint);
  const response = await fetch(`http://127.0.0.1:5000/api/${endpoint}`);
  const result = await response.json()
  console.log("result", result)
  return result;
}

export const useStateWithSessionStorage = (key, initial) => {
  const [value, setValue] = useState(sessionStorage.getItem(key || initial));

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value])

  return [value, setValue];
}
