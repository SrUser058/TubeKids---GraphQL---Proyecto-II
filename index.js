require('dotenv').config();
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./graphql-schema.js');
const cors = require("cors");
const express = require('express');


const app = express();

// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const theSecretKey = process.env.JWT_SECRET;

//All the function to the JWT Middleware
const {saveSession,getSession} = require('./controllers/sessionController.js');

// expose in the root element the different entry points of the
// graphQL service
const graphqlResolvers = {
  getAllCourses: courseGetAll,
  searchCourses: (params) => courseSearch(params),
  hello: function() { return "Hola Mundo"},
  version: function() {return "1.0"}
};

// Middlewares
app.use(express.json());
// check for cors
app.use(cors({
  domains: 'http://127.0.0.1:5500',
  methods: "*"
}));

// login with JWT
/*app.post("/api/session", function (req, res) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {

    //TODO: query the database to get the user info
    const token = jwt.sign({
      userId: 123,
      name: 'Bladimir'
    }, theSecretKey);

    res.status(201).json({
      token
    })
  } else {
    res.status(422);
    res.json({
      error: 'Invalid username or password'
    });
  }
});*/

// JWT Authentication middleware
/*app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers['authorization'].split(' ')[1];
    try {
      jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.json({
            error: "Unauthorized"
          });
        }
        console.log('Welcome', decodedToken.name);
        next();
      });
    } catch (e) {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});*/

app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
