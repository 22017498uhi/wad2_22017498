import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

function AQuestionList() {
    const [aquestions, setAQuestions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4040/api/aquestions/list')
        .then(function (response) {
          if (response?.data?.success) {
            setAQuestions(response.data.questions)
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }, [])

    return (
      <div className="container">
          <h1 className="text-center">A-Level Question List</h1>
          <div className="row">
            {aquestions.map((aquestion, index) => {
              const urlstring = "/aq/" + aquestion.qid
              return <div key={index} style={{ display: 'flex', flexDirection: 'row'}}><Link to={urlstring}>{aquestion.title}</Link></div>
            })}
          </div>
      </div>
    );
  }
  
  export default AQuestionList;