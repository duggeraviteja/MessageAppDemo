import React,{useContext , useState} from 'react'

import { UserContext } from "./App";
import MyChats from "./MyChats"
import ChatBox from "./ChatBox"
import ChatNavBar from './ChatNavbar';
function Home() {
  const {state }  = useContext(UserContext);
  const [fetchAgain, setfetchAgain] = useState(true)

return (
  <div>
      <div>
      <ChatNavBar /> 
      </div>  
    
    <div className='d-flex col-12'>
      <div className='row col-4 btn-custom-1 '> 
      {state && <MyChats  fetchAgain ={fetchAgain} />}  
      </div>
      <div className='row col-8 m-1 btn-custom-2'>
      {state && <ChatBox  fetchAgain ={fetchAgain}  setfetchAgain = {setfetchAgain} />} 
      </div>
     
    </div>

  </div>
)
}

export default Home