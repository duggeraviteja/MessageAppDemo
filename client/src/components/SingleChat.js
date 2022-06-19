import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./App";

import { toast } from "react-toastify";
import {
  getSender,
  getSenderFull,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./GetSender";

import axios from "axios";

function SingleChat({ fetchAgain, setfetchAgain }) {
  const { state, selectedChat, chats, setSelectedChat } =
    useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState();

  const [loading, setLoading] = useState(false);

  const [getFullUser, setgetFullUser] = useState([]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/allMessage?chatId=${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      // return toast.error(`${error}`)
      console.log(error);
    }
  };

  const viewDeatils = async (state, users) => {
    if (users) {
      return setgetFullUser(getSenderFull(state, users));
    }
  };

  const sendMessage = async (e) => {
    if (!newMessage) return toast.info("Nothing to send... ");
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };

      setNewMessage("");
      const { data } = await axios.post(
        "http://localhost:5000/sendMessage",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );


      if(data.errorMessage) {
        return toast.info(data.errorMessage);
      }
      toast.success("message sent Successfully")
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const typingHandler = async (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      <div className="container-fluid">

        {!selectedChat ? (
          <div className="  text-center">
            Click on A user to Start Chatting .....
          </div>
        ) : (
          <div>
            {selectedChat.isGroupChat === false ? (
              <div>
                {/* start */}
                <div
                  className="modal fade m24"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className=" text-center" id="exampleModalLabel">
                          Profile Details
                        </h5>
                        <button
                          type="button"
                          className="btn-close text-reset"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="m-2 mx-auto">
                        <div>
                          <img
                            src={getFullUser.userImage}
                            alt="User"
                            className="rounded-circle"
                            width="100px"
                            height="100px"
                            border="2px"
                          />

                          <h3 className="tex-center m-2 ms-4">
                            <b className="usernamestyle">
                              {getFullUser.username}
                            </b>
                          </h3>
                        </div>
                      </div>

                      <div>
                        <h3 className=" text-center mb-3">
                          {getFullUser.email}
                        </h3>
                      </div>
                      <div className="text-center m-3 p-1">
                        <button
                          type="button"
                          className="btn btn-warning"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* end */}

                <button
                  type="button"
                  className="btn "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i
                    className="fa fa-2x fa-eye"
                    onClick={(e) => viewDeatils(state, selectedChat.users)}
                  ></i>
                </button>
                <i> {getSender(state, selectedChat.users)} </i>
              </div>
            ) : (
              <div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="m-3">
        <div className="messagebox">

          {messages &&
            messages.length > 0 &&
            messages.map((m, i) => (
              <div style={{ display: "flex" }} key={m._id}>
                {(isSameSender(messages, m, i, state._id) ||
                  isLastMessage(messages, i, state._id)) && (
                  <img
                    src={m.sender.userImage}
                    alt="pic"
                    width="30px"
                    className="rounded-circle"
                    height="30px"
                    borderRadius="50px"
                  />
                )}

                <span
                  style={{
                    backgroundColor: `${
                      m.sender._id === state._id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, state._id),
                    marginTop: isSameSender(messages, m, i, state._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
        </div>





<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="text-center" id="">Send Message</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="container ">
          <div>
            <div className="">
              {/* onKeyDown={(e)=>sendMessage (e)} */}

              <form className="">
                <div>

                <textarea

                  type="text"
                  className="form-control"
                  onChange={typingHandler}
                  placeholder="Enter a Message"
                  required
                  value={newMessage}
                  autoComplete="on"
                  autoFocus
                />
               
                </div>
                
               
                  <div className="mx-auto text-center m-2">
                  <button
                    className="btn btn-info "
                    onClick={(e) => sendMessage(e)}
                    onKeyDown={(e) => sendMessage(e)}
                    data-bs-dismiss="modal"
                  >
                    Send
                  </button>

                  </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</div>



<div className="sendMessageInputBox  mb-1" >
<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
  Compose Message
</button>
</div>

       





















        

        
   
      </div>
    </>
  );
}

export default SingleChat;
