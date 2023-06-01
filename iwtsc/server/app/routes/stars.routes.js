const { authJwt } = require("../middleware");
const controller = require("../controllers/stars.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

  app.post("/api/stars/get", [authJwt.verifyToken], controller.getStars);
  app.post("/api/stars/add", [authJwt.verifyToken], controller.addStar);
}