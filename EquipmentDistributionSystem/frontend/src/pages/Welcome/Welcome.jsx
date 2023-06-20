import './Welcome.css'
import { useNavigate } from 'react-router';

const Welcome = () => {
    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate('/login')
    }

    const navigateRegister = () => {
        navigate('/register')
    }
    return (
        <div className="welcome--container">
            <h1>Welcome to the app</h1>
            <div className="buttons">
                <button onClick={navigateLogin}>Login</button>
                <button onClick={navigateRegister}>Register</button>
            </div>
        </div>
    )
} 

export default Welcome;