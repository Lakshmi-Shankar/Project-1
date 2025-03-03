import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!email){
            return setErrors({err: "Email is required"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return setErrors({err: "Invalid email format"})
        }
        try{
            const response = await fetch("https://project-1-backend-ur4w.onrender.com/users/userbyemail",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email})
            });
            const data = await response.json();
            console.log(data);

            if (response.ok){
                localStorage.setItem("Username", data.Username);
                navigate("/home")
            }else{
                setErrors({err: "User not found"})
            }
        }catch(erro){
            setErrors({err: "Server is busy"})
            console.log(erro)
        }
    }
    return (
        <>
            <div className='loginBox'>
            <h2 className='title'>Login</h2>
                <form>
                    <input className='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
                    {<p className='loginError'>{errors.err}</p>}
                    <button type='submit' className='loginButton' onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
