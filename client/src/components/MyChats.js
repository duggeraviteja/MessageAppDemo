import React, { useEffect, useState, useContext } from "react";

import SingleChat from "./SingleChat";
import { UserContext } from "./App";
import { getSender } from "./GetSender";
import axios from "axios";

function MyChats({ fetchAgain }) {
  const { state, selectedChat, setSelectedChat, chats, setChats } =
    useContext(UserContext);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/fetchChats",
        config
      );
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain, setSelectedChat]);

  return (
    <div>
      {chats ? (
        <div
          className="container-fluid mychats-section"
          style={{ overflowY: "scroll", height: "500px" }}
        >
          {chats.map((chat) => {
            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="mychats"
              >
                <b className="m-2">
                  {!chat.isGroupChat
                    ? getSender(state, chat.users)
                    : chat.chatName}
                </b>

                {chat.latestMessage && (
                  <p className="ms-2">
                    <b>{chat.latestMessage.sender.name} </b>
                    {chat.latestMessage.content.length > 50 ? (
                      chat.latestMessage.content.substring(0, 51) + "..."
                    ) : (
                      <span className="ms-2 mb-2">
                        {chat.latestMessage.content}
                      </span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MyChats;
