const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    fathersGetAll(email: String!, password: String!): [Father]
    fathersGetEmail(email: String!): [Father]
    childsGetAll(_id:ID!): [Childs]
    childsGetByFather(_id: ID!): [Childs]
    playlistGetByFather (_id: ID!): [Playlist]
    hello: String
    version: String
  }

  type Childs {
    _id: ID!
    name: String,
    age: Int,
    pin: Int,
    father: Father!,
    avatar: Int
  }

  type Father {
    _id: ID!,
    name: String!,
    lastname: String!,
    email: String!,
    phone: Int!,
    age: Int,
    password: String!,
    pin: Int!,
    country: String,
    birthdate: Date,
    status: String,!
    avatar: Int
  }

  type Playlist {
    _id: ID!
    name: String!
    father: Father!,
    videos: [{
      name: String!,
      URL: String!,
      description: String!
    }]
    linked: [{
      _id: ID
      child: ID!
    }]
  }

  `);