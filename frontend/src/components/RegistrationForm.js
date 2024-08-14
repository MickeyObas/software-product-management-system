import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm(){
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleChange(e){
       setInput((input => {
        return {
            ...input,
            [e.target.name]: e.target.value 
        }
       }))
    };

    function handleErrors(errorData){
        if(errorData.email){
            setErrors({'email': 'User with this email already exists. Please use another email address'})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            console.log("Form all good!");
            // Make fetch POST request to DRF
            try{
                const response = await fetch('http://localhost:8000/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": input.email,
                        "password": input.password
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
            console.log(errors);
        }
    };

    function validate(){
        let isValid =  true;
        let errorData = {};

        if(!input["email"]){
            isValid = false;
            errorData["email"] = "Please enter your email address"
        }

        if(typeof input["email"] !== "undefined"){
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(input["email"])){
                isValid = false;
                errorData["email"] = "Pleasae enter a valid email address";
            }
        }

        if(!input["password"]){
            isValid = false;
            errorData["password"] = "Please enter your password"
        }

        if(typeof(input["password"]) !== "undefined"){
            var patternPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            if(!patternPassword.test(input["password"])){
              isValid = false;
              errorData["password"] = "The password should contain atleast one lowercase, one uppercase, one digit and one special character. The password should be atleast 8 characters long."
            }
          }
    
          if (typeof(input["password"]) !== "undefined" && typeof input["confirm_password"] !== "undefined"){
            if (input["password"] !== input["confirm_password"]){
              isValid = false;
              errorData["confirm_password"] = "Passwords don't match"
            }
          }

          setErrors(errorData);

        return isValid;
    };

    return (
        <div className='container'>
            <h1 className='text-center mb-4'>REGISTRATION FORM</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email" className='form-label fs-5 fw-bold'>EMAIL</label>
                    <input
                    type='text'
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                    className='form-control fs-5'
                    placeholder='Enter Email Address'
                    id='email'
                    />
                    <div className='text-danger form-text fw-bold'>{errors.email}</div>
                </div>
                <div className='form-group'>
                    <label htmlFor="password" className='form-label fs-5 fw-bold'>PASSWORD</label>
                    <input
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    className='form-control fs-5'
                    placeholder='Enter Password'
                    id='password'
                    />
                    <div className='text-danger form-text fw-bold'>{errors.password}</div>
                </div>
                <div className='form-group'>
                    <label htmlFor="confirm-password" className='form-label fs-5 fw-bold'>CONFIRM PASSWORD</label>
                    <input
                    type='password'
                    name='confirm_password'
                    value={input.confirm_password}
                    onChange={handleChange}
                    className='form-control fs-5'
                    placeholder='Confirm Password'
                    id='confirm-password'
                    />
                    <div className='text-danger form-text fw-bold'>{errors.confirm_password}</div>
                </div>
                <input
                type='submit'
                value='SUBMIT'
                className='btn btn-success d-flex justify-content-center mx-auto mb-3 px-3'
                />
            </form>
        </div>
    )
}

