import welcome from '../../assets/welcome.png';
import logo from '../../assets/LOGO.png'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import authService from '../../auth/authService';
import './Login.css'
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [err, setErr] = useState('')

    function handleChange(e) {
        e.preventDefault()

        setUser({...user, [e.target.name]: e.target.value})
    }
    function handleNavigate() {
        axios.post("http://localhost:8080/api/users/login", user)
        .then((response) => {
            const token = response.data;
            console.log(token)
            navigate('/dashboard/products')
            authService.storeAuthToken(token)
        })
        .catch(err => {
            console.log(err)
            // setErr(err.response.data.error)
        })
    }

    function navigateRegister() {
        navigate('/register')   
    }
    return (
        <div className="login--container">
            <div className="static">
                <img src={welcome} alt="Welcome image" />
                <div className="overlay"></div>
                <div className="text-holder">
                    <h1>Welcome Back</h1>
                    <p>Log in to access your account</p>
                </div>
            </div>

            <div className="content">
                <img src={logo} alt="Logo" />
                {err && <p className='error'>{err}</p>}
                <div className="form">
                    <input type="email" name="email" id="" placeholder='Email' value={user.email} onChange={handleChange}/>
                    <input type="password" name="password" id="" placeholder='Password' value={user.password} onChange={handleChange}/>
                    <input type="submit" name="" id="" value="LOG IN " onClick={handleNavigate}/>
                </div>
                <div className="footer-text">
                    <p>OR</p>
                    <p>Do not have an account?<span onClick={navigateRegister}>Register</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login;