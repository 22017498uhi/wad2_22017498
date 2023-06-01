//const db = require("../models"); //dont need postgress stuff
//const Questions = db.activity; //dont need postgress stuff

//RP : add mongo model
const Questions = require('../mongoModels/questions.model');

exports.questions = (req, res) => {
  // Questions.findAll({
  //   where: {
  //     qtype: "q"
  //   }
  // })

  //RP : find data from mongo
  Questions.find({
    qtype: "q"
  })
    .then(qs => {
      console.log(qs);
      if (qs && qs.length > 0) { 
        const qNames = qs.map((q) => {
            return {
                qid: q.urltitle,
                title: q.fulltitle
            }
        })
        
        return res.status(200).send({ success: true, questions: qNames});
      } else {
        res.status(404).send({ success: false, questions: []});
      } 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.question = (req, res) => {
  //RP: mongo has findOne method so using it. only parameter will change. i.e removed "where"
    Questions.findOne({
        urltitle: req.body.urltitle
    })
      .then(q => {
        if (q) { 
          const qData = {
            urltitle: q.urltitle,
            fulltitle: q.fulltitle,
            qtext: q.qtext,
            answers: JSON.parse(q.metadata)
          }
          return res.status(200).send({ success: true, question: qData });
        } else {
          res.status(404).send({ success: false, message: "no question found"});
        } 
      })
      .catch(err => {
        res.status(500).send({ success: false, message: err.message });
      });
  };