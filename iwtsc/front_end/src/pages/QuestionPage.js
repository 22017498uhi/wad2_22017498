import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QuestionSection from '../components/QuestionSection'
import HintsSection from '../components/HintsSection'
import AnswerSection from '../components/AnswerSection'
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function QuestionPage() {
  let navigate = useNavigate();
  const [title, setTitle] = useState(null)
  const [questionText, setQuestionText] = useState(null)
  const [answers, setAnswers] = useState(null)
  const [cookies, setCookies] = useCookies(['session']);
  const { qid } = useParams()

  useEffect(() => {
    if (cookies['session'] && qid) {
      axios.post('http://localhost:8080/api/questions/question', { "urltitle": qid }, { headers: {"x-access-token": cookies['session'] }})
        .then(function (response) {
          if (response?.data?.success) {
            setTitle(response.data.question.fulltitle)
            setQuestionText(response.data.question.qtext)
            setAnswers(response.data.question.answers.answers)
          }
        })
        .catch(function (error) {
          navigate("/login")
        });
    } else {
      navigate("/login")
    }
  },[])

  return (
    <div className="container">
        {title && <h1 className="text-center mt-3">{title}</h1>}
        <div className="row">
            <QuestionSection questionText={questionText} />
            <HintsSection />
        </div>
        <div className="row">
            <AnswerSection answers={answers} qid={qid}/>
        </div>
    </div>
  );
}

export default QuestionPage;