import React, { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

function AnswerSection({ answers, qid }) {
    let navigate = useNavigate()
    const [answer, setAnswer] = useState(null)

    //dont redirect if embedded after checkanswer is correct
  const [searchParams] = useSearchParams();
  const [isEmbeded] = useState(searchParams.get('embeded'));


    

    function checkAnswer() {
        if (answer != null && answers[answer].correct == true) {
            alert("Correct")
            if(!isEmbeded){
                navigate('/aqlist')
            }
           
        } else {
            alert("Wrong, try again!")
        }
    }

    return (
        <div className="col-12">
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