import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Signup = () => {
    const navigate = useNavigate();
    const [passType, setPassType] = useState("password");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const togglePassword = () => {
        setPassType(prevType => prevType === "password" ? "text" : "password");
    };

    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name) {
            errors.name = "Name is required";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Invalid email format";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            const response = await fetch('https://project-1-backend-ur4w.onrender.com/users/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                localStorage.setItem("Username",name)
                navigate("/home");
            } else {
                setErrors({ general:"Signup Failed User Already Exist." });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setErrors({ general: "Server error. Please try again." });
        }
    };
    

    return (
        <div className='signupBox'>
            <h2 className='title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    className='name' 
                    type='text' 
                    placeholder='Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input 
                    className='email' 
                    type='text' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input 
                    className='password' 
                    type={passType} 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <label className='pass'>
                    <input 
                        className='checkbox' 
                        type='checkbox' 
                        onChange={togglePassword} 
                    />
                    Show Password
                </label>

                <button className='signupButton' type="submit" onClick={handleSubmit}>Sign Up</button>
                <p>
                    <Link  className='toLogin' to="/login">Already have an account?</Link>
                </p>
                {errors.general && <p className="servererror">{errors.general}</p>}
            </form>
        </div>
    );
};


export default Signup;
