import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});

    const navigate = useNavigate();

    function validateEmail(emailString){
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailString);
    }

    function validateFirstName(firstName) {
        const nameRegex = /^[A-Za-z]+$/; // Only letters allowed
        if (!firstName) {
            return false;
        } else if (!nameRegex.test(firstName)) {
            return false;
        } else if (firstName.length < 2 || firstName.length > 30) {
            return false;
        }
        return true; // Valid input
    }
    
    function validateLastName(lastName) {
        const nameRegex = /^[A-Za-z]+$/; // Only letters allowed
        if (!lastName) {
            return false;
        } else if (!nameRegex.test(lastName)) {
            return false;
        } else if (lastName.length < 2 || lastName.length > 30) {
            return false;
        }
        return true; // Valid input
    }
    

    function validatePassword(passwordString){
        let patternPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return patternPassword.test(passwordString);
    }

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
                errorData["email"] = "Please enter a valid email address";
            }
        }

        if(firstName){
            const nameRegex = /^[A-Za-z]+$/;
            if(firstName.length < 2 || firstName.length > 30){
                errorData['firstName'] = "Name must be between 2 and 30 characters."
                isValid = false;
            } else if(!nameRegex.test(firstName)){
                errorData['firstName'] = "Name must contain only letters";
                isValid = false;
            }
        } else{
            errorData['firstName'] = 'First name is required';
            isValid = false;
        }

        if(lastName){
            const nameRegex = /^[A-Za-z]+$/;
            if(lastName.length < 2 || lastName.length > 30){
                errorData['lastName'] = "Name must be between 2 and 30 characters.";
                isValid = false;
            } else if(!nameRegex.test(lastName)){
                errorData['lastName'] = "Name must contain only letters";
                isValid = false;
            }
        } else{
            errorData['lastName'] = 'First name is required';
            isValid = false;
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

    function handleEmailChange(e){
        let emailString = e.target.value;
        setEmail(emailString);
        if(!validateEmail(emailString)){
            setError((err => (
                {
                    ...err,
                    email: "Please enter a valid email address"
                }
            )))
            return;
        } else{
            setError((err => (
                {
                    ...err,
                    email: null
                }
            )))
        }
    }
    function handleFirstNameChange(e){
        let firstNameString = e.target.value;
        setFirstName(firstNameString);
        if(!validateFirstName(firstNameString)){
            setError((err => (
                {
                    ...err,
                    firstName: "Please enter a valid name"
                }
            )))
            return;
        } else{
            setError((err => (
                {
                    ...err,
                    firstName: null
                }
            )))
        }
    }


    function handleLastNameChange(e){
        let lastNameString = e.target.value;
        setLastName(lastNameString);
        if(!validateFirstName(lastNameString)){
            setError((err => (
                {
                    ...err,
                    lastName: "Please enter a valid name"
                }
            )))
            return;
        } else{
            setError((err => (
                {
                    ...err,
                    lastName: null
                }
            )))
        }
    }

    
    function handlePasswordChange(e){
        setPassword(e.target.value);
        if(!validatePassword(e.target.value)){
            setError((err => (
                {
                    ...err,
                    password: "The password should contain atleast one lowercase, one uppercase, one digit and one special character. The password should be atleast 8 characters long."
                }
            )))
            return;
        }else{
            setError((err => (
                {
                    ...err,
                    password: null
                }
            )))
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
                        'password': password,
                        'first_name': firstName,
                        'last_name': lastName
                    })
                });

                if(response.ok){
                    const data = await response.json();
                    navigate('/login/');
                }else{
                    const errorData = await response.json();
                    handleErrors(errorData);
                }
            } catch(err){
            }
        } else{
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
                        onChange={handleEmailChange}
                        required
                    />
                    {email && error.email && <p className='register-error'>{error.email}</p>}
                </label>
                <label className="register-label">
                    First Name
                    <input
                        type="text"
                        className="register-input"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                    {firstName && error.firstName && <p className='register-error'>{error.firstName}</p>}
                </label>
                <label className="register-label">
                    Last Name
                    <input
                        type="text"
                        className="register-input"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                    {lastName && error.lastName && <p className='register-error'>{error.lastName}</p>}
                </label>
                <label className="register-label">
                    Password
                    <input
                        type="password"
                        className="register-input"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {password && error.password && <p className='register-error'>{error.password}</p>}
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
                    {password && confirmPassword && (confirmPassword !== password) && <p className='register-error'>Passwords do not match</p>}
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
