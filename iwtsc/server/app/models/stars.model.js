module.exports = (sequelize, Sequelize) => {
    const Stars = sequelize.define("stars", {
      username: {
        type: Sequelize.STRING
      },
      qid: {
        type: Sequelize.STRING
      }
    });
  
    return Stars;
  };