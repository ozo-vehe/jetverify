import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataFromIPFS } from '../utils/storedData'

function Login({ data, setData, userDetails, setUserDetails, isIndividual, setIsindividual, confimState, setConfirmState }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userNotfound, setUserNotFound] = useState(false)
  const navigate = useNavigate()

  const isUser = async(loginEmail, loginPassword) => {
    const storedData = await dataFromIPFS()
    const {email, password} = storedData

    if(loginEmail === email && loginPassword === password) return true
    else return false
  }

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

  const handleIndividualLogin = (e) => {
    e.preventDefault();
    data.find((item) => {
      // Change item.username to item.password
      if (item.email === loginEmail && item.username === loginPassword) {
        setUserDetails({...item})
        setConfirmState(true)
        setUserNotFound(false)
        console.log("email found", userDetails, confimState);
        return 'user found';
      } else {
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
          <form className="form">
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
                <button className="signup-btn"
                  onClick={ async (e)=> {
                    e.preventDefault()
                    // await isUser(loginEmail, loginPassword)
                    if(true) {
                      console.log(isUser(loginEmail, loginPassword))
                      navigate("jetverify/dashboard")
                    }
                    else {
                      alert("Wrong details")
                    }
                    // handleIndividualLogin(e);
                  }}>
                  Proceed
                </button>
                {/* <Route
                  path="/"
                  element={ cartItems.length < 1 ? <Navigate to="/products" /> : <Checkout /> }
                />; */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
