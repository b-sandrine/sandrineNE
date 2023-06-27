import { useEffect, useState } from 'react';
import './Products.css'
import useProducts from './ProductsOps'
import AddProduct from '../../models/AddProduct/AddProduct';

export default function Products() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([]);

    const {
        err,
        data,
        getAllProducts
    } = useProducts();

    const [selectedProduct, setSelectedProduct] = useState([])

    function openModal(product) {
        setIsOpen(true)
        setSelectedProduct([...selectedProduct, product])
    }

    function closeModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    function addToCart(product) {
        setSelectedProducts([...selectedProducts, product]);
    }

    return (
        <div className="products--container">
            {err && alert(`${err}`)}
            <div className="header">
                <p>Products</p>
                {/* <button onClick={openModal}>Add to Cart / Buy</button> */}
                {isOpen ?
                    <AddProduct onSuccess={() => [
                        getAllProducts()
                    ]} isOpen={openModal} onClose={closeModal} productId={selectedProduct.id} productName={selectedProduct.name}/>
                    : null}
            </div>
            <div className="table">
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Names</th>
                            <th>Product Type</th>
                            <th>Price</th>
                            <th>Registration Date</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.productType}</td>
                                        <td>{item.price}</td>
                                        <td>{item.inDate}</td>
                                        <td>
                                            <button onClick={() => openModal(item)}>Add to Cart</button>
                                        </td>
                                    </tr>
                                )
                                
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}