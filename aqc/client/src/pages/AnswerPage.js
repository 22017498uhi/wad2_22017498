import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AnswerSection from '../components/AnswerSection'
import { useParams, useNavigate , useSearchParams} from 'react-router-dom';


function AQuestionPage() {
  let navigate = useNavigate();
  const [title, setTitle] = useState(null)
  const [answers, setAnswers] = useState(null)
  const { aqid } = useParams()

  //dont show title if embedded
  const [searchParams] = useSearchParams();
  const [isEmbeded] = useState(searchParams.get('embeded'));


  useEffect(() => {
    if (aqid) {
      axios.post('http://localhost:4040/api/aquestions/answers', { "urltitle": aqid })
        .then(function (response) {
          if (response?.data?.success) {
            setTitle(response.data.question.fulltitle)
            setAnswers(response.data.question.answers.answers)
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
        {title && !isEmbeded && <h1 className="text-center mt-3">{title}</h1>}
        <div className="row">
            <AnswerSection answers={answers} qid={aqid}/>
        </div>
    </div>
  );
}

export default AQuestionPage;