import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './ALevelStyles.css';

function ALevelQuestionPage() {
    let navigate = useNavigate();
    const [cookies] = useCookies(['session']);

    const { qid } = useParams()


    useEffect(() => {
        if (cookies['session'] && qid) {
         //all good if logged in
        } else {
        //navigate to login page if not logged in
          navigate("/login")
        }
      },[])

return (
<div className="container">
    
    <div className="row">
        <iframe name='questionframe' src={`http://localhost:4000/aq/${qid}?embeded=true`} height={200}></iframe>  
    </div>

    <div className="row">
        <iframe name='answerframe' src={`http://localhost:4000/answer/${qid}?embeded=true`} height={400}></iframe>      
    </div>
</div>
);


}

export default ALevelQuestionPage;