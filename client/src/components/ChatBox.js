import React ,{useEffect,useState, useContext} from 'react'

import SingleChat  from './SingleChat'
import { UserContext } from "./App";
function ChatBox({fetchAgain, setfetchAgain}) {
  const {selectedChat  }  = useContext(UserContext);


  return (
    <div className="messagebox "           style={{overflowY:"scroll",height:"550px"}}
    >
      <SingleChat  fetchAgain ={fetchAgain}  setfetchAgain = {setfetchAgain} />
    </div>
  )
}

export default ChatBox