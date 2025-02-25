import React from 'react';
import { useState } from 'react';
import "../App.css"

const Signup = () => {
    const [passType, setPassType] = useState("password")

    const passChange = ()=>{
        setPassType(passType === "password" ? "text":"password")
    }
    return (
        <>
            <div className='signupBox'>
                <h2 className='title'>Sign Up</h2>
                <form>
                    <input className='name' type='text' placeholder='Name'></input>
                    <input className='email' type='text' placeholder='Email'></input>
                    <input className='password' type={passType} placeholder='Password'></input>
                    <label className='pass'>
                        <input className='checkbox' type='checkbox' onClick={passChange} />
                        Show Password
                    </label>
                <button className='signupButton'>Sign Up</button>
                </form>
            </div>  
        </>
    );
}


export default Signup;