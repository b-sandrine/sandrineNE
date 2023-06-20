import './AddVehicle.css'
import { useState , useEffect} from 'react';
import axios from 'axios';
import authService from '../../auth/authService';
import useCarOwners from '../../stores/OwnerOps';

const AddVehicle = ({ isOpen, onClose, onSuccess }) => {
    const [vehicle, setVehicle] = useState({
        chasisNumber: "",
        manufacturer: "",
        year: '',
        price: '',
        plateNumber: "",
        model: "",
        createdBy: "",
    })

    const {
        err,
        getAllCarOwners,
        data
    } = useCarOwners();

    function handleOnChange(e) {
        e.preventDefault();
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        getAllCarOwners()
    }, [])


    function handleNavigate() {
        axios.post('http://localhost:3000/api/vehicles/create', vehicle, {
            headers: {
                token: `Bearer ${authService.getAuthToken()}`
            }
        })
        .then((response) => {
            console.log(response)
            onClose()
            onSuccess()
        })
        .catch((error) => {
            console.log(error)
            // setErr(error.response.data.error)
        })
    }
    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-content">
                <div className="close">
                    <span onClick={onClose}>&times;</span>
                </div>
                <h2>Add New Vehicle</h2>
                {err && <p className='error'>{err}</p>}
                <div className="form">
                    <input type="text" name="chasisNumber" id="" placeholder='Chasis Number' value={vehicle.chasisNumber} onChange={handleOnChange} />
                    <input type="text" name="manufacturer" id="" placeholder='Manufacture Company' value={vehicle.manufacturer} onChange={handleOnChange} />
                    <input type="number" name="year" id="" placeholder='Manufacture Year' value={vehicle.year} onChange={handleOnChange} />
                    <input type="number" name="price" id="" placeholder='Price. Eg: 16000000' value={vehicle.price} onChange={handleOnChange} />
                    <input type="text" name="plateNumber" id="" placeholder='Plate Number' value={vehicle.plateNumber} onChange={handleOnChange} />
                    <input type="text" name="model" id="" placeholder='Model Name' value={vehicle.model} onChange={handleOnChange} />
                    <select name="createdBy" onChange={handleOnChange}>
                        <option>Choose Owner</option>
                        {data.map((item => (
                            <option key={item._id} value={item._id} >{item.fullnames}</option>
                        )))}
                    </select>
                    <div className="buttons">
                        <input type="submit" name="" id="" value="Cancel" className='cancel' onClick={onClose} />
                        <input type="submit" name="" id="" value="Submit" className='success' onClick={handleNavigate}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;