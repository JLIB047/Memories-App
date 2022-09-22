import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import Icon from './icon';



const Auth = () => {
    const user = false;
    const classes = useStyles();  
    const [showPassword, setShowPassword] = useState(false); 
    const [isSignup, setIsSignup] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = () => {

    };
    const handleChange = () => {

    }
   
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async(res) => {
        const result = jwt_decode(res?.credential);
        console.log(result);

        try{
            new EventTarget({type:'AUTH', data: {result}});
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.Avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}> 
                        {
                            isSignup && (
                                <>
                                
                                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                 <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                         
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>                        
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} startIcon={< Icon/>}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <div>
                        {user ? (
                            <div>Logged In</div>
                        ) : (
                            <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={() => console.log('Login Failed')}
                            />
                        )}
                    </div>
                    
                    <Grid container justifyContent="flex-end">
                            <Grid>
                                <Button onClick={switchMode}>
                                        { isSignup ? "Already have an account? Sign In!" : "Don't have an account? Sign up!" }
                                    </Button>    
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;