const db = require("../models");
const Questions = db.activity;

exports.questions = (req, res) => {
  Questions.findAll({
    where: {
      qtype: "aq"
    }
  })
    .then(qs => {
      if (qs && qs.length > 0) { 
        const qNames = qs.map((q) => {
            return {
                qid: q.dataValues.urltitle,
                title: q.dataValues.fulltitle
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
    Questions.findOne({
      where: {
        urltitle: req.body.urltitle
      }
    })
      .then(q => {
        if (q) { 
          const qData = {
            urltitle: q.dataValues.urltitle,
            fulltitle: q.dataValues.fulltitle,
            qtext: q.dataValues.qtext
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

  exports.answer = (req, res) => {
    Questions.findOne({
      where: {
        urltitle: req.body.urltitle
      }
    })
      .then(q => {
        if (q) { 
          const qData = {
            fulltitle: q.dataValues.fulltitle,
            answers: JSON.parse(q.dataValues.metadata)
          }
          return res.status(200).send({ success: true, question: qData });
        } else {
          res.status(404).send({ success: false, message: "no answer found"});
        } 
      })
      .catch(err => {
        res.status(500).send({ success: false, message: err.message });
      });
  };