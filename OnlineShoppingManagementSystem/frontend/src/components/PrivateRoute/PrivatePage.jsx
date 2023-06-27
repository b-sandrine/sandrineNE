import authService from "../../auth/authService";
import { useNavigate } from "react-router-dom";

export default function PrivatePage({children}){

    const isAuthenticated = authService.isAuthenticated();
    const navigate = useNavigate();

  if(!isAuthenticated) {
    navigate("/login", {replace: true})
    return null;
  }

    return(
        <>
        {children}
        </>
    )
}