const controller = require("../controllers/activity.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

  app.get("/api/aquestions/list", controller.questions);
  app.post("/api/aquestions/aquestion", controller.question);
  app.post("/api/aquestions/answers", controller.answer);
}
