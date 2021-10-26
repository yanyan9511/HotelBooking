const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/customertracker';

let db;

let aboutMessage = "Customer Tracker API v1.0";

const customerDB = [
  {
     sn_id: 1, name: 'David', contact: '91415076', created: new Date('2018-08-15'),
  },
  {
     sn_id: 2, name: 'Amy', contact: '84249928', created: new Date('2018-08-15'),
  },
  {
     sn_id: 3, name: 'Christina', contact: '83426754', created: new Date('2018-08-15'),
  },
];

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});


const resolvers = {
  Query: {
    about: () => aboutMessage,
    customerList,
  },
  Mutation: {
    setAboutMessage,
    customerAdd,
    customerRemove,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function customerList() {
  const customers = await db.collection('customers').find({}).toArray();
  return customers;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function customerAdd(_, { customer }) {
  customer.created = new Date();
  customer.sn_id = await getNextSequence('customers');
  const result = await db.collection('customers').insertOne(customer);
  const savedCustomer = await db.collection('customers')
    .findOne({ _id: result.insertedId });
  return savedCustomer;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function customerRemove(_, { customer }) {
  //const removeIndex = customerDB.findIndex( item => item.name === customer.name );
  //customerDB.splice( removeIndex, 1 );
  //customerDB.forEach((e,i) => { e.sn_id = i+1 });
  await db.collection('customers').deleteOne({ name: customer.name });
  }

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});


const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();