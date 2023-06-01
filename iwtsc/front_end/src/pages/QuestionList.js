import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import { useCookies } from 'react-cookie';

function QuestionList({ cke }) {
    const [questions, setQuestions] = useState([])
    const [stars, setStars] = useState([])
    const [cookie, setCookies] = useCookies(['session']);

    useEffect(() => {
        axios.get('http://localhost:8080/api/questions/list')
        .then(function (response) {
          if (response?.data?.success) {
            setQuestions(response.data.questions)
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });

        if (cookie["username"]) {
          axios.post('http://localhost:8080/api/stars/get', { "username": cookie['username'] }, { headers: {"x-access-token": cookie['session'] }})
          .then(function (response) {
            if (response?.data?.success) {
              const starsValues = response.data.stars.map((s) => s.qid)
              setStars(starsValues)
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
        }
    }, [cke])

    return (
      <div className="container">
          <h1 className="text-center">Question List</h1>
          <div className="row">
            {questions.map((question, index) => {
              const urlstring = "/q/" + question.qid
              return <div key={index} style={{ display: 'flex', flexDirection: 'row'}}><Link to={urlstring}>{question.title}</Link>{stars.includes(question.qid) && <p style={{ marginLeft: 12 }}>Complete</p>}</div>
            })}
          </div>
      </div>
    );
  }
  
  export default QuestionList;