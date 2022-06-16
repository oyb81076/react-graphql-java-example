import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import mocks from './mocks';

const schemaString = readFileSync(join(__dirname, './schema.graphql'), 'utf-8');
const typeDefs = gql(schemaString);

const server = new ApolloServer({ typeDefs, mocks });
server.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}, console.error);
