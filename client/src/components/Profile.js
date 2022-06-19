import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "./App";

function Profile() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getdata = async () => {
      state = await state;
    };
  }, []);

  return (
    <div>
      <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src={state.userImage} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{state.username}</h5>

              <div>
                <hr />
              </div>

              <div className="row">
                <div className="container">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="home">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p> {state.username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{state.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{state.mobile}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Role</label>
                        </div>
                        <div className="col-md-6">
                          <p>{state.role}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Joined on</label>
                        </div>
                        <div className="col-md-6">
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
  );
}

export default Profile;
