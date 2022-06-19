import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./App";

function ChatNavBar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { state, dispatch, selectedChat, setSelectedChat, chats, setChats } =
    useContext(UserContext);

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
      const { data } = await axios.post(`http://localhost:5000/accessChat`, { userId }, config);
      setSelectedChat(data);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    } catch (error) {
   return   toast.error(error);
    }
  };

  const searchUser = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };

    const { data } = await axios.get(`http://localhost:5000/allUsers?search=${search}`, config);
    setData(data);
    
  };

  const searcModel = () => {
    return [
      <button
        className="btn btn-danger"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Search User <i className="fa fa-search p-2"></i>
      </button>,
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            <form className="d-flex m-searh-model " method="GET">
              <input
                className="container-fluid col-8  m-1 "
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email"
                aria-label="Search"
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-warning  ms-1 mt-1 mb-1"
                onClick={searchUser}
              >
           
                Search
              </button>
            </form>
          </h5>

          <button
            type="button"
            className="btn-close text-reset m-1"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {
          data?.map((user, k) => {
            return (
              <div key={user._id}>
                <div className="d-flex m-2 p-1 userlist">
                  <img
                    src={user.userImage}
                    alt="User"
                    className="rounded-circle"
                    width="50px"
                    height="50px"
                    border="2px"
                  />
                  <div className="row m-2 ">
                    <button
                      className="btn "
                      onClick={() => {
                        accessChat(user._id);
                      }}
                      data-bs-dismiss="offcanvas"
                    >
                      {user.username}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>,
    ];
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span key={1234}> {searcModel()} </span>
         
        </div>
      </nav>
    </div>
  );
}

export default ChatNavBar;
