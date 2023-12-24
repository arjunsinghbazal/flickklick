import React from "react";
import "./Header.css"
import { useNavigate } from "react-router-dom";
const Header = () =>{
    const navigate = useNavigate();
    return (
       <>
         <div className="header" onClick={()=>navigate("/")}>
            Fl<span>ic</span>kkl<span>ic</span>k 
        </div>
       </>
    )
}

export default Header;