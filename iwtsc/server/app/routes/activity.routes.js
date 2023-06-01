const { authJwt } = require("../middleware");
const controller = require("../controllers/activity.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

  app.get("/api/questions/list", controller.questions);

  app.post("/api/questions/question", [authJwt.verifyToken], controller.question);
}
