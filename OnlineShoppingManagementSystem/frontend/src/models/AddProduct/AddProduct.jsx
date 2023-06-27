import './AddProduct.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { BsDatabaseDash } from 'react-icons/bs';
// import authService from '../../auth/authService';
const AddProduct = ({ isOpen, onClose, onSuccess , productId, productName}) => {
    const [product, setProduct] = useState({
        user_id: "",
        code: "",
        productName: "",
        quantity: "",
        unitPrice: ""
    })

    const navigation = useNavigate();

    const [err, setErr] = useState('');
    function handleOnChange(e) {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    function handleNavigate() {
        console.log(product)
        axios.post('http://localhost:8080/api/purchased/add', product)
            .then((response) => {
                console.log(response)
                onSuccess();
                onClose();
                navigation('/dashboard/cart')
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.log(error)
                // setErr(error.response.data.error)
            })
    }
    return (
        <div className="modal--overlay">
            <div className={`${isOpen ? 'modal-open' : 'model'}`}>
                <div className="modal-content">
                    <div className="close">
                        <span onClick={onClose}>&times;</span>
                    </div>
                    <h2>Add to Cart</h2>
                    {err && <p className='error'>{err}</p>}
                    <div className="form">
                        <input type="number" name="code" id="" placeholder='Product ID' value={productId} onChange={handleOnChange} />
                        <input type="text" name="productName" id="" placeholder='Product Name' value={productName} onChange={handleOnChange} />
                        <input type="number" name="quantity" id="" placeholder='Product quantity' value={product.quantity} onChange={handleOnChange} />
                        <input type="number" name="unitPrice" id="" placeholder='Product Unit Price' value={product.unitPrice} onChange={handleOnChange} />
                        <input type="number" name="user_id" id="" placeholder='User Identification' value={product.user_id} onChange={handleOnChange} />
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

export default AddProduct;