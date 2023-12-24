import React from "react";
import "./Header.css"
import { useNavigate } from "react-router-dom";
const Header = () =>{
    const navigate = useNavigate();
    return (
       <>
         <div className="header" onClick={()=>navigate("/")}>
            Flickklick 
        </div>
       </>
    )
}

export default Header;