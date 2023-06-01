//https://github.com/bezkoder/node-js-jwt-authentication-postgresql

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose'); //Added mongoose for connecting with mongodb

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_MONGO_HOST}/${process.env.MONGO_DB}`);

mongoose.connection.on('open', function () {
console.log('Connected to mongo server.');


})

const app = express();

var corsOptions = {
origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
extended: true
}));

// database - Postgres
const db = require("./app/models");
const Role = db.role;
//const Questions = db.activity   RP: not needed as migrating to mongodb

//RP : import Questions model of mongoose
const Questions = require('./app/mongoModels/questions.model')

async function init() {
await sleep(5000);
}

function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
}


init().then(() => {
// db.sequelize.sync();
// force: true will drop the table if it already exists
mongoose.connection.dropCollection('questions'); //drop questions collection and its data 
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('Drop and resync DB');
  initial();
});
})



// simple route
app.get("/", (req, res) => {
res.json({
  message: "Welcome to the app"
});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/activity.routes')(app)
require('./app/routes/stars.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

function initial() {
Role.create({
  id: 1,
  name: "user"
});

Role.create({
  id: 2,
  name: "moderator"
});

Role.create({
  id: 3,
  name: "admin"
});


const question1 = new Questions({
  // id: 1,  //dont need id
  qtype: "q",
  urltitle: "bin_search",
  fulltitle: "Binary Search",
  qtext: "This is some question text about binary search, isn't it?",
  metadata: JSON.stringify({
    'answers': [{
      'text': 'Yes',
      'correct': true
    }, {
      'text': 'No',
      'correct': false
    }, {
      'text': 'Maybe',
      'correct': false
    }, {
      'text': 'All of the above',
      'correct': false
    }]
  })
})

const question2 = new Questions({
  //   id: 2, //dont need id
  qtype: "q",
  urltitle: "avl_trees",
  fulltitle: "AVL Trees",
  qtext: "This is some question text about AVL Trees, isn't it?",
  metadata: JSON.stringify({
    'answers': [{
      'text': 'Yes',
      'correct': true
    }, {
      'text': 'No',
      'correct': false
    }, {
      'text': 'Maybe',
      'correct': false
    }, {
      'text': 'All of the above',
      'correct': false
    }]
  })
})

const question3 = new Questions({
  //   id: 3, //dont need id
  qtype: "q",
  urltitle: "java_types",
  fulltitle: "Java Types",
  qtext: "This is some question text about Java types, isn't it?",
  metadata: JSON.stringify({
    'answers': [{
      'text': 'Yes',
      'correct': true
    }, {
      'text': 'No',
      'correct': false
    }, {
      'text': 'Maybe',
      'correct': false
    }, {
      'text': 'All of the above',
      'correct': false
    }]
  })
})

//RP: insert these questions into mongo
question1.save().then(() => {
  console.log('question 1 added successfully.');
})
question2.save().then(() => {
  console.log('question 2 added successfully.');
})
question3.save().then(() => {
  console.log('question 3 added successfully.');
})


// Questions.create({
//     id: 1, 
//     qtype: "q",
//     urltitle: "bin_search",
//     fulltitle: "Binary Search",
//     qtext: "This is some question text about binary search, isn't it?",
//     metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
// })

// Questions.create({
//   id: 2, 
//   qtype: "q",
//   urltitle: "avl_trees",
//   fulltitle: "AVL Trees",
//   qtext: "This is some question text about AVL Trees, isn't it?",
//   metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
// })

// Questions.create({
//   id: 3, 
//   qtype: "q",
//   urltitle: "java_types",
//   fulltitle: "Java Types",
//   qtext: "This is some question text about Java types, isn't it?",
//   metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
// })

}