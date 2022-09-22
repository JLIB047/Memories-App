import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';

const App = () => {
   const apiKey = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <GoogleOAuthProvider clientId={`${apiKey}`}> 
        <BrowserRouter>
        <Container maxWidth='lg'>
            <Navbar />
            <Routes> 
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );

}

export default App;