import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login({ data, setData, userDetails, setUserDetails, isIndividual, setIsindividual, confimState, setConfirmState }) {
//   const [isIndividual, setIsindividual] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
//   const [data, setData] = useState({});
  const [userNotfound, setUserNotFound] = useState(false)
//   const [userDetails, setUserDetails] = useState({})

//   const [isloading, setIsloading] = useState(true);

  const handleIndividualAccount = (e) => {
    if (isIndividual) {
      return;
    }

    setIsindividual((prev) => !prev);
  };

  const handleOrganizationAccount = (e) => {
    if (!isIndividual) {
      return;
    }

    setIsindividual((prev) => !prev);
  };

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(loginEmail, loginPassword)
  // }

//   useEffect(() => {
//     if (isIndividual) {
//       fetch("http://localhost:3000/individuals/")
//         .then((res) => res.json())
//         .then((data) => {
//           setData(data);
//           setIsloading(false);
//           console.log(data);
//         });
//     } else {
//       fetch("http://localhost:3000/organizations/")
//         .then((res) => res.json())
//         .then((data) => {
//           setData(data);
//           setIsloading(false);
//           console.log(data);
//         });
//     }
//   }, [isIndividual]);

  const handleIndividualLogin = (e) => {
    e.preventDefault();
    data.find((item) => {
      if (item.email === loginEmail && item.password === loginPassword) {
        setUserDetails({...item})
        setConfirmState(true)
        setUserNotFound(false)
        console.log("email found", userDetails, confimState);
        return 'user found'
      }  else {
        console.log('user not found')
        setUserNotFound(true)
      }
    });
   
  };

  return (
    <div className="signup-parent">
      <div className="sign-up">
        <div className="signup-form">
          <div className="signup-header">
            <h2 className="signup-header-title">Login</h2>
            <div className="signup-header-text">
              Don't have an account?{" "}
              <Link to="/signup" className="login-text">
                Sign up
              </Link>
            </div>
          </div>
          <div className="account-type">
            <button
              className={isIndividual ? "active" : "inactive"}
              onClick={handleIndividualAccount}
            >
              Individual
            </button>
            <button
              className={isIndividual ? "inactive" : "active"}
              onClick={handleOrganizationAccount}
            >
              Organization
            </button>
          </div>
          <form className="form" onSubmit={handleIndividualLogin}>
            <div className="signup-form-input">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={handleLoginEmail}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={handleLoginPassword}
                />
              </div>

              {userNotfound && <p className="password-match-text">Email and password do no match</p>}
              <div className="submit-btn-container">
                <button type="submit" className="signup-btn">
                  Proceed
            </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;