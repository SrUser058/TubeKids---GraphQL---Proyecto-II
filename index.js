require('dotenv').config();
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./graphql-schema.js');
const cors = require("cors");
const mongoose = require("mongoose");

const express = require('express');
const app = express();

//Secret key in the .env file
const theSecretKey = process.env.JWT_SECRET;

// database connection
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});



//All the function to the middlewares and resolvers
//const {saveSession,getSession} = require('./controllers/sessionController.js');
const {getAllFather,getEmail} = require('./controllers/fatherController.js');
const {getChildsByFather,getChilds} = require('./controllers/childsController.js');
const {getPlaylistByFather, getPlaylistByChild, getAllPlaylist} = require('./controllers/playlistControler.js');


// expose in the root element the different entry points of the
// graphQL service
const graphqlResolvers = {
  fathersGetAll:(_id) => getAllFather(_id),
  fathersGetEmail: (email) => getEmail(email),
  childsGetAll: (_id) => getChilds(_id),
  childsGetByFather: (father) => getChildsByFather(father),
  playlistGetAll: (_id) => getAllPlaylist(_id),
  playlistGetByFather: (father) => getPlaylistByFather(father),
  playlistGetByChild: (child) => getPlaylistByChild(child),
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


// JWT Authentication middleware
app.use(function (req, res, next) {
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
});


app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

app.listen(3000, () => console.log(`Service listening on port 3000!`))
