const db = require("../models");
const Stars = db.stars;

exports.getStars = (req, res) => {
  Stars.findAll({
    where: {
      username: req.body.username
    }
  })
    .then(sts => {
      if (sts && sts.length > 0) { 
        const starsFiltered = sts.map((s) => {
            return {
                qid: s.dataValues.qid,
            }
        })
        
        return res.status(200).send({ success: true, stars: starsFiltered});
      } else {
        res.status(404).send({ success: false, stars: []});
      } 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.addStar = (req, res) => {
    Stars.findOne({
      where: {
        username: req.body.username,
        qid: req.body.qid
      }
    })
    .then(sts => {
        if (sts) { 
            return res.status(200).send({ success: false, message: "Already completed"});          
        } else {
            Stars.create({
                username: req.body.username,
                qid: req.body.qid
            })
            .then((st) => {
                res.status(200).send({ success: true, messages: "Star added"});
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        } 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };