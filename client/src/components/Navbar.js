import React ,{ useContext }from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";


function Navbar() {
const { state, dispatch } = useContext(UserContext);
let navigate = useNavigate();


  let navitemsList = ()=>{
    if(!state) {
      return[
     
      <li className="nav-item" key="2">
        <Link className="nav-link" to="/login"> Login </Link>
      </li>,
      <li className="nav-item" key="3">
        <Link className="nav-link" to="/register"> Register </Link>
      </li> ,
       
        
      ]
    } else {
      return [

        <li className="nav-item" key="1">
        <Link className="nav-link " to="/"> Home </Link>
      </li> ,
        <li className="nav-item" key="4">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li> , 
      <li className="nav-item" key="5">
        <span className="nav-link btn"
                      onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      dispatch({ type: "CLEAR" });
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                   
                  >
                    Logout
                  </span>
      </li>

      ]
    }
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
           App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">



            {navitemsList()}
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
