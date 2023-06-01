module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define("questions", {
        id: {
            type: Sequelize.INTEGER
        },
        qtype: {
            type: Sequelize.STRING
        },
        urltitle: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        fulltitle: {
            type: Sequelize.STRING
        },
        qtext: {
            type: Sequelize.STRING
        },
        metadata: {
            type: Sequelize.STRING
        }
    });
  
    return Questions;
};