import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});

    const navigate = useNavigate();

    function validate(){
        let isValid =  true;
        let errorData = {};

        if(!email){
            isValid = false;
            errorData["email"] = "Please enter your email address"
        }

        if(typeof email !== "undefined"){
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(email)){
                isValid = false;
                errorData["email"] = "Pleasae enter a valid email address";
            }
        }

        if(!password){
            isValid = false;
            errorData["password"] = "Please enter your password"
        }

        if(typeof(password) !== "undefined"){
            var patternPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            if(!patternPassword.test(password)){
              isValid = false;
              errorData["password"] = "The password should contain atleast one lowercase, one uppercase, one digit and one special character. The password should be atleast 8 characters long."
            }
          }
    
          if (typeof(password) !== "undefined" && typeof confirmPassword !== "undefined"){
            if (password !== confirmPassword){
              isValid = false;
              errorData["confirm_password"] = "Passwords don't match"
            }
          }

          setError(errorData);

        return isValid;
    };

    function handleErrors(errorData){
        if(errorData.email){
            setError({'email': 'User with this email already exists. Please use another email address'})
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(validate()){
            console.log("The form's all good buddy!");
            try{
                const response = await fetch('http://localhost:8000/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                });

                if(response.ok){
                    const data = await response.json();
                    console.log("User registered successfully: ", data);
                    navigate('/login/');
                }else{
                    console.log("Whoops, something went wrong!");
                    const errorData = await response.json();
                    handleErrors(errorData);
                }
            } catch(err){
                console.log("Error during fetch call!");
            }
        } else{
            console.log("You got some errors");
            console.log(error);
        }
    }

    return (
        <div className='wrapper'>
            <div className="register-container">
            <h1 className="register-header">Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="register-label">
                    Email
                    <input
                        type="email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {error.email && <p className='register-error'>{error.email}</p>}
                </label>
                <label className="register-label">
                    Password
                    <input
                        type="password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error.password && <p className='register-error'>{error.password}</p>}
                </label>
                <label className="register-label">
                    Confirm Password
                    <input
                        type="password"
                        className="register-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error.confirm_password && <p className='register-error'>{error.confirm_password}</p>}
                </label>
                <button type="submit" className="register-button">Register</button>
                <div className="register-footer">
                    <p>Already have an account? <a href="/login" className="register-link">Login</a></p>
                </div>
            </form>
        </div>
        </div>
    );
}
