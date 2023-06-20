import Sidebar from "../../components/Sidebar/Sidebar";
import profile from "../../assets/profile.png"
import { Outlet } from "react-router";
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard--container">
            <Sidebar />
            <div className="content">
                <div className="content--header">
                    <div className="title">
                        <p>Dashboard</p>
                    </div>
                    <img src={profile} alt="Profile Image" />
                </div>
                <div className="content--changing">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;