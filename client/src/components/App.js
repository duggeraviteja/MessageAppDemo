import './style.css';
import React,{useEffect , createContext , useReducer , useContext, useState} from "react";

import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {initialState, reducer} from "./Reducer/userReducer";


import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from './Register';
import Profile from './Profile';
import SingleChat from './SingleChat';



export const UserContext = createContext();

function App() {
  const [selectedChat, setSelectedChat ] = useState([]);
  const [chats, setChats ] = useState([]);

 let navigate = useNavigate();

 

  const [state,dispatch] = useReducer(reducer,initialState); 

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
          navigate("/login");
    }
  },[dispatch])





  return (
  <div className="App">


    <UserContext.Provider value={{state,dispatch,selectedChat, setSelectedChat,chats, setChats }}> 

    
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/singlechat" element={<SingleChat />} />
    </Routes>
    </UserContext.Provider>    



     
    </div>
  );
}

export default App;
