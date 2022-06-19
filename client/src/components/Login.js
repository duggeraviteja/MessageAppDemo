import React, { useState,useContext, useEffect , useReducer } from "react";

import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./App";
toast.configure();

function Login() {
 
  let navigate = useNavigate();
  const { state , dispatch } = useContext(UserContext);

  // console.log(state);


  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const sendData = async (e) => {
    e.preventDefault();

    

    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data);
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
         dispatch({ type: "USER", payload: data.user });
          toast.success('Login Successfull',  {position: toast.POSITION.BOTTOM_RIGHT , autoClose:3000})
          navigate("/");
        }
      });
  };


  return (
    <div>

<div className="col-md-6 mx-auto">
    <div className=" conatiner custom-bg">
              <div className="container-fluid">
                <div className="form-box">
                  <div className="form-group mb-2">
                    <label>
                      Email <span className="imp-mark">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      onChange={(e) => setemail(e.target.value)} 
                    />

              
                  </div>

                  <div className="form-group mb-2">
                    <label>
                      Password <span className="imp-mark">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                 

                 

                  <div className="col-12 text-center mt-2" id="return">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={sendData}
                      data-bs-dismiss="modal"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
        
</div>


    </div>
  );
}

export default Login;
