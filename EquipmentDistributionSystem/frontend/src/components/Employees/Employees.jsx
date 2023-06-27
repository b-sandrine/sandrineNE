import { useState, useEffect } from 'react';
import './Employees.css'
import Pagination from '../Pagination/Pagination';
import AddEmployee from '../../models/AddEmployee/AddEmployee';
import useEmployees from './EmployeeOps';

export default function Employees() {

    const [isOpen, setIsOpen] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    const [count, setCount] = useState(1);

    const {
        err,
        data,
        getAllEmployees
     } = useEmployees();
    
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }


    useEffect(() => {
        getAllEmployees(count)
    }, [count])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="employees--container">
            {err && alert(`${err}`)}
            <div className="header">
                <p>Employees</p>
                <button onClick={openModal}>Add New Employee</button>
                {isOpen ?
                    <AddEmployee onSuccess={() => [
                        getAllEmployees()
                    ]} isOpen={openModal} onClose={closeModal} />
                    : null}
            </div>
            <div className="table">
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Names</th>
                            <th>NID</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Manufacturer</th>
                            <th>Model</th>
                            <th>Serial Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.fullnames}</td>
                                        <td>{item.NID}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.department}</td>
                                        <td>{item.position}</td>
                                        <td>{item.manufacturer}</td>
                                        <td>{item.model}</td>
                                        <td>{item.serialNumber}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <Pagination count={count} setCount={setCount} />
            </div>

            <div className="div">
                <div className="item">
                    {
                        data?.map((item) => {
                            return (
                                <>
                                    <p>Full names: {item.fullnames}</p>
                                    <p>NID: {item.NID}</p>
                                    <p>Phone Number: {item.telephone}</p>
                                    <p>Email: {item.email}</p>
                                    <p>Department: {item.department}</p>
                                    <p>Position: {item.position}</p>
                                    <p>Manufacturer: {item.manufacturer}</p>
                                    <p>Model: {item.model}</p>
                                    <p>Serial Number: {item.number}</p>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}