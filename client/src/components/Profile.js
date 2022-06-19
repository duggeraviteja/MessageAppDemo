import React,{useEffect,useState,useContext} from 'react'

import { UserContext } from "./App";


function Profile() {



  const { state , dispatch } = useContext(UserContext);

  useEffect(() => {
   const getdata = async()=>{
     state = await state;
   }
  }, [])
  

 
  
  
  return (
    <div>

      <div class="container emp-profile">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={state.userImage} alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                       {state.username}
                                    </h5>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
                                    <p class="proile-rating">EXPERIANCE : <span>3 Years</span></p>



                                    <div class="row">
                   
                    <div class="container">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home">
                                       
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p> {state.username}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{state.email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{state.mobile}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Joined on</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{state.createdOn}</p>
                                            </div>
                                        </div>
                            </div>
                            
                        </div>
                    </div>
                </div>


                        </div>
                    </div>
                    
                </div>
                
               
                 
        </div>
    </div>
  )
}

export default Profile