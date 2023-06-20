import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import welcome from '../../assets/welcome.png';
import logo from '../../assets/logo1.png'
import './Signup.css'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        cpassword: "",
    })

    const [err, setErr] = useState('');

    function handleOnChange(e) {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleNavigate() {
        console.log(user)
        axios.post("http://localhost:5000/api/users/create", user)
        .then((response) => {
            if(response) {
                console.log(response)
                navigate('/login')
            }
        })
        .catch(err => {
            console.log(err.response.data)
            setErr(err.response.data.error)
        })  
    }

    function handleRegister () {
        navigate('/login')
    }

    return (
        <div className="signup--container">
            <div className="static">
                <img src={welcome} alt="Welcome image" />
                <div className="overlay"></div>
                <div className="text-holder">
                    <h1>Sign Up</h1>
                    <p>Almost there</p>
                </div>
            </div>

            <div className="content">
                <img src={logo} alt="Logo" />
                {err && <p className="error">{err}</p>}
                <div className="form">
                    <input type="email" name="email" id="" placeholder='Email' value={user.email} onChange={handleOnChange} />
                    <input type="password" name="password" id="" placeholder='Password' value={user.password} onChange={handleOnChange} />
                    <input type="password" name="cpassword" id="" placeholder='COnfirm Password' value={user.cpassword} onChange={handleOnChange} />
                    <input type="submit" name="" id="" value="Sign Up " onClick={handleNavigate} />
                </div>
                <div className="footer-text">
                    <p>OR</p>
                    <p>Already have an account?<span onClick={handleRegister}>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;