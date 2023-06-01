import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QuestionSection from '../components/QuestionSection'
import HintsSection from '../components/HintsSection'
import { useParams, useNavigate, Link , useSearchParams } from 'react-router-dom';


function AQuestionPage() {
  let navigate = useNavigate();
  const [title, setTitle] = useState(null)
  const [questionText, setQuestionText] = useState(null)
  const { aqid } = useParams()

  //dont show answer link if embeded query param is there.
  const [searchParams] = useSearchParams();
  const [isEmbeded] = useState(searchParams.get('embeded'));


  useEffect(() => {
    if (aqid) {
      axios.post('http://localhost:4040/api/aquestions/aquestion', { "urltitle": aqid })
        .then(function (response) {
          if (response?.data?.success) {
            setTitle(response.data.question.fulltitle)
            setQuestionText(response.data.question.qtext)
          }
        })
        .catch(function (error) {
          navigate("/")
        });
    } else {
      navigate("/")
    }
  },[])

  return (
    <div className="container">
        {title && <h1 className="text-center mt-3">{title}</h1>}
        <div className="row">
            <QuestionSection questionText={questionText} />
        </div>
       {!isEmbeded && <div className="row">
            <Link to={`/answer/${aqid}`}>Answer question</Link>
        </div> }
    </div>
  );
}

export default AQuestionPage;