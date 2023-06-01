import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from 'react-router-dom';

function SignUpIn() {
    let navigate = useNavigate();
    const [signUp, setSignUp] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [cookies, setCookie] = useCookies(['session']);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [email1, setEmail1] = useState("")
    const [email2, setEmail2] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    function checkEmailAndPasswords() {
        if (email1 == email2 && password1 == password2) {
            return true
        } else {
            alert("emails or passwords don't match")
            return false
        }
    }

    return (
      <div className="container" style={{ display: 'flex', flex: 1, height: '100vh', justifyContent: 'center', alignItems:'center' }}>
          <div>
            <div style={{ marginBottom: 24 }}>
                {!signUp ? <h1 className="text-center">Sign in</h1> : <h1 className="text-center">Sign up</h1> }
            </div>
            {!signUp ? (<div className="row" style={{ width: 500 }}>
                <div className="form-floating mb-3">
                    <input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput" style={{ marginLeft: 12 }}>Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword" style={{ marginLeft: 12 }}>Password</label>
                </div>
                <div className="d-grid gap-2">
                    <button type="button" onClick={() => {
                        axios.post('http://localhost:8080/api/auth/signin', {
                            username: email,
                            password: password
                          })
                          .then(function (response) {
                            setCookie('session', response.data.accessToken, { path: '/' });
                            setCookie('username', response.data.username, { path: '/' });
                            navigate("/")
                          })
                          .catch(function (error) {
                            alert(error.response.data.message)
                          });
                    }} className="btn btn-secondary" disabled={disabled}>Submit</button>
                </div>
            </div>) : 
            (<div className="row" style={{ width: 500 }}>
                <div className="form-floating mb-3">
                    <input type="email" value={email1} onChange={(e) => {
                        setEmail1(e.target.value)
                    }} className="form-control" id="floatingInput1" placeholder="name@example.com" />
                    <label htmlFor="floatingInput" style={{ marginLeft: 12 }}>Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" value={email2} onChange={(e) => {
                        setEmail2(e.target.value)
                    }} className="form-control" id="floatingInput2" placeholder="name@example.com" />
                    <label htmlFor="floatingInput2" style={{ marginLeft: 12 }}>Re-enter email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" value={password1} onChange={(e) => {
                        setPassword1(e.target.value)
                    }} className="form-control" id="floatingPassword1" placeholder="Password" />
                    <label htmlFor="floatingPassword" style={{ marginLeft: 12 }}>Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" value={password2} onChange={(e) => {
                        setPassword2(e.target.value)
                    }} className="form-control" id="floatingPassword2" placeholder="Password" />
                    <label htmlFor="floatingPassword2" style={{ marginLeft: 12 }}>Validate password</label>
                </div>
                <div className="d-grid gap-2">
                    <button onClick={() => {
                        const check = checkEmailAndPasswords()
                        if (check) {
                            axios.post('http://localhost:8080/api/auth/signup', {
                                "username": email1,
                                "email": email1,
                                "password": password1,
                                "roles": ["user"]
                            })
                            .then(function (response) {
                                alert(response.data.message)
                                setSignUp(false)
                            })
                            .catch(function (error) {
                                alert(error.response.data.message)
                            });
                        }
                    }}  type="button" className="btn btn-secondary" disabled={disabled}>Submit</button>
                </div>
            </div>)}
            <div className="row" style={{ marginTop: 20 }}>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input readOnly onClick={() => {
                        setSignUp(false)
                    }} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={!signUp} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Sign in</label>
                    
                    <input readOnly onClick={() => {
                        setSignUp(true)
                    }} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={signUp} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Sign up</label>
                </div>
            </div>
          </div>
      </div>
    );
  }
  
  export default SignUpIn;