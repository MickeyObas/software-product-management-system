import { useState } from 'react';

const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
    window.location.href = '/login';
}


export default function Dashboard(){
    return (
        <>
            <h1>This is a dashboard!!!</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}