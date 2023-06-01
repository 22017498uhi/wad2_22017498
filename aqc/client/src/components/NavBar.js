import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom';



function NavBar() {

    //check if there is "embeded" URL query param
    //if its there, we dont show content of this Navbar as its embdeded in another site as iFrame
    const [searchParams] = useSearchParams();
    const [isEmbeded] = useState(searchParams.get('embeded'));
  
    return (
    <div>
       {!isEmbeded &&<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">ALC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/aqlist">Questions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> }
    </div>  
    )
}

export default NavBar;