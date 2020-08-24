import React, { useState, useEffect } from 'react';

export default function Logout({setToken}) {
  
    useEffect(() => {
        const evalData = async () => {
            setToken(null);
        }
        evalData();
    }, [])
}