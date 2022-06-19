import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    gender: "",
    role: "",
  });

  let navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const sendData = async (e) => {
    e.preventDefault();

    const { username, email, mobile, password, dob, gender, role } = user;

    console.log(user);

    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        mobile,
        password,
        dob,
        gender,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.message);
          navigate("/login");
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
                <label for="name">
                  Name <span className="imp-mark">*</span>
                </label>
                <input
                  className="form-control was-validated"
                  type="text"
                  name="username"
                  onChange={handleInput}
                />
              </div>

              <div className="form-group mb-2">
                <label for="name">
                  Email <span className="imp-mark">*</span>
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInput}
                />
              </div>

              <div className="form-group mb-2">
                <label for="name">
                  Mobile <span className="imp-mark">*</span>{" "}
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="mobile"
                  id="mobile"
                  minLength="10"
                  maxLength="12"
                  onChange={handleInput}
                />
              </div>

              <div className="form-group   ">
                <label for="bookid">Select Gender</label>
                <select onChange={handleInput} name="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label>Role</label>
                <input
                  className="form-control"
                  type="text"
                  name="role"
                  onChange={handleInput}
                />
              </div>

              <div className="form-group mb-2">
                <label>Date Of Birth</label>
                <input
                  className="form-control"
                  type="date"
                  id="dob"
                  name="dob"
                  onChange={handleInput}
                />
              </div>

              <div className="form-group mb-2">
                <label>password</label>
                <input
                  className="form-control"
                  type="password"
                  id="dob"
                  name="password"
                  onChange={handleInput}
                />
              </div>

              <div className="col-12 text-center mt-2" id="return">
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={sendData}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
