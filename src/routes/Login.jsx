import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataFromIPFS } from '../utils/storedData'

function Login({ data, setData, userDetails, setUserDetails, isIndividual, setIsIndividual, confimState, setConfirmState }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userNotfound, setUserNotFound] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const fetchUser = async()=> {
    console.log("Fetching users...")
    let storedData = await dataFromIPFS()
    console.log(storedData)
    setUsers(storedData)

    return users
  }
  const isUser = async(loginEmail, loginPassword) => {
    console.log("Waiting....")
    let storedUsers = await fetchUser()
    const user = []
    console.log(storedUsers)
    storedUsers.forEach((u)=> {
      if(u.email == loginEmail && u.password == loginPassword) {
        console.log(u)
        user.push(u)
      }
    })
    if(user.length < 1) return false
    else return true
  }

  const handleIndividualAccount = (e) => {
    if (isIndividual) {
      return;
    }

    setIsIndividual((prev) => !prev);
  };

  const handleOrganizationAccount = (e) => {

    if (!isIndividual) {
      return;
    }

    setIsIndividual((prev) => !prev);
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
      // Change item.username to item.password
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



// useEffect(() => {
//     handleIndividualAccount()
// }, [loginEmail, loginEmail])


//   navigate to dashboard 
function navigateToDashboard() {
    if(confimState) {
        window.location.href = "/dashboard";
    }
  }

//   set user details to local storage
    useEffect(() => {
      fetchUser()
        if (confimState) {
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
            // navigateToDashboard()
        }
    }, [confimState])


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
                  onChange={(e)=>{
                    setLoginEmail(e.target.value)
                    console.log("Deployed")
                  }}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e)=>{
                    setLoginPassword(e.target.value)
                    // console.log(loginPassword)
                  }}
                />
              </div>

              {userNotfound && <p className="password-match-text">Email and password do no match</p>}
              <div className="submit-btn-container">
                <button className="signup-btn"
                  onClick={ async (e)=> {
                    e.preventDefault()
                    // await isUser(loginEmail, loginPassword)
                    const user = await isUser(loginEmail, loginPassword)
                    if(user) {
                      console.log(isUser(loginEmail, loginPassword))
                      // navigate("jetverify/dashboard")
                      window.location.pathname = "/dashboard"
                    }
                    else {
                      alert("Wrong details")
                    }
                    // handleIndividualLogin(e);
                  }}>
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
