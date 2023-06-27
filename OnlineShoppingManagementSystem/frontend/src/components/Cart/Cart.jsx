import './Cart.css'
import { useEffect, useState } from 'react';
import useCart from './CartOps';

export default function Cart() {
    const {
        err,
        data,
        getAllCartProducts
    } = useCart();


    useEffect(() => {
        getAllCartProducts()
    }, [])

    return (
        <div className="cart--container">
            <div className="table">
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Customer ID</th>
                            <th>Date</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit price</th>
                            <th>Total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.price}</td>
                                        <td>{item.inDate}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit_price}</td>
                                        <td>{item.total_price}</td>
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