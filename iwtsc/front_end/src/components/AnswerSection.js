import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';

function AnswerSection({ answers, qid }) {
    const [cookie, setCookie] = useCookies(['session']);
    const [answer, setAnswer] = useState(null)
    

    function checkAnswer() {
        if (answer != null && answers[answer].correct == true) {
            axios.post('http://localhost:8080/api/stars/add', { "username": cookie['username'], "qid": qid }, { headers: {"x-access-token": cookie['session'] }})
                .then(function (response) {
                    
                })
                .catch(function (error) {
                    
                });
            alert("Correct")
        } else {
            alert("Wrong, try again!")
        }
    }

    return (
        <div className="col-12">
            <h3 className="text-center">Answers</h3>
            <div className="p-3 mb-2 bg-light">
                <div className="row">
                    {answers && answers.map((a, index) => {
                        if (index%2 == 0) {
                            return (<div key={index} className="col-sm d-grid gap-2">
                                {answers[index] && <button onClick={() => {
                                    setAnswer(index)
                                }} type="button" className="btn btn-secondary mb-2 p-4">{answers[index].text}</button>}
                                {(answers.length >= index+1 && answers[index+1]) && <button onClick={() => {
                                    setAnswer(index+1)
                                }} type="button" className="btn btn-secondary mb-2 p-4">{answers[index+1].text}</button>}
                            </div>)
                        }
                    })}
                </div>
                <div className="row">
                    <div className="col-sm text-center">
                        <button onClick={() => checkAnswer()} type="button" className="btn btn-primary p-4">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default AnswerSection;