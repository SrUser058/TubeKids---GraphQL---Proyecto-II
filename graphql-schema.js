const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    fathersGetAll(_id: ID!): Father
    fathersGetEmail(email: String!): Father
    childsGetAll(_id:ID!): Childs
    childsGetByFather(father: ID!): [Childs]
    playlistGetByFather (father: ID!): [Playlist]
    playlistGetByChild (child: String!): [Playlist]
    hello: String
    version: String
  },

  type Childs {
    _id: ID!
    name: String
    age: Int
    pin: Int
    father: Father!
    avatar: Int
  },

  type Father {
    _id: ID!
    name: String!
    lastname: String!
    email: String!
    phone: Int!
    age: Int
    password: String!
    pin: Int!
    country: String
    birthdate: String
    status: String!
    avatar: Int
  },

  type Playlist {
    _id: ID!
    name: String!
    linked: [Linked]!
    father: ID!
    videos: [Videos]!
  }

  type Videos {
    name: String!
      URL: String!
      description: String!
  }

  type Linked {
    _id: ID
    child: ID
  }
  
  `);

/*
  

  
*/