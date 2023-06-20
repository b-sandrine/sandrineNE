import './AddEmployee.css'
import { useState } from 'react';
import axios from 'axios';
import authService from '../../auth/authService';
const AddEmployee = ({ isOpen, onClose, onSuccess }) => {
    const [user, setUser] = useState({
        fullnames: "",
        NID: '',
        telephone: "",
        email: "",
        department: "",
        position: "",
        manufacturer: "",
        model: "",
        serialNumber: ""
    })

    const [err, setErr] = useState('');
    function handleOnChange(e) {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleNavigate() {
        console.log(user)
        axios.post('http://localhost:5000/api/employees/create', user, {
            headers: {
                token: `Bearer ${authService.getAuthToken()}`
            }
        })
            .then((response) => {
                console.log(response)
                onSuccess();
                onClose();
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.log(error)
                setErr(error.response.data.error)
            })
    }
    return (
        <div className="modal--overlay">
            <div className={`${isOpen ? 'modal-open' : 'model'}`}>
                <div className="modal-content">
                    <div className="close">
                        <span onClick={onClose}>&times;</span>
                    </div>
                    <h2>Add New Employee</h2>
                    {err && <p className='error'>{err}</p>}
                    <div className="form">
                        <input type="text" name="fullnames" id="" placeholder='Full Names' value={user.fullnames} onChange={handleOnChange} />
                        <input type="number" name="NID" id="" placeholder='National Id' value={user.NID} onChange={handleOnChange} />
                        <input type="text" name="telephone" id="" placeholder='Phone number' value={user.telephone} onChange={handleOnChange} />
                        <input type="email" name="email" id="" placeholder='Email' value={user.email} onChange={handleOnChange} />
                        <input type="text" name="department" id="" placeholder='Department' value={user.department} onChange={handleOnChange} />
                        <input type="text" name="position" id="" placeholder='Position' value={user.position} onChange={handleOnChange} />
                        <input type="text" name="manufacturer" id="" placeholder='Laptop Manufacturer' value={user.manufacturer} onChange={handleOnChange} />
                        <input type="text" name="model" id="" placeholder='Model' value={user.model} onChange={handleOnChange} />
                        <input type="number" name="serialNumber" id="" placeholder='Serial Number' value={user.serialNumber} onChange={handleOnChange} />
                        <div className="buttons">
                            <input type="submit" name="" id="" value="Cancel" className='cancel' onClick={onClose} />
                            <input type="submit" name="" id="" value="Submit" className='success' onClick={handleNavigate} />
                        </div>
                    </div>
                </div>
            </div>
            {/* {err === 'unauthorized' && navigate('/login')} */}
        </div>
    );
};

export default AddEmployee;