import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    let navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['session']);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (cookie["session"]) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [cookie])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">IWTSC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/qlist">Questions</a>
                        </li>
                        <li className="nav-item">
                            {!loggedIn && <a className="nav-link" href="/login">Login/Register</a>}
                            {loggedIn && <a onClick={(e) => {
                                e.preventDefault()
                                removeCookie("session")
                                removeCookie("username")
                                navigate("/")
                            }} className="nav-link" href="/login">Sign out</a>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/aqlist"  >A-Level Questions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;