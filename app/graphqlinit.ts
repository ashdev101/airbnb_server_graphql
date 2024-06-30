import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken"
import { corsOptions } from '../config/corsOptions';
import { jwtuserContext } from '../types/common';
import { Listing } from './graphqlSchema/listings';


export const graphqServer = async () => {
  const app = express();



  const httpServer = http.createServer(app);

  app.use(bodyParser.json())
  app.use(cors())

  const server = new ApolloServer
    <jwtuserContext>
    ({
      typeDefs: `
      ${Listing.types}
        
        type Query  {
          ${Listing.queries}
        }

        type Mutation {
          ${Listing.mutations}
        }
      `,
      resolvers: {
        Query: {
          ...Listing.resolvers.Query
        },

        Mutation: {
          ...Listing.resolvers.Mutation
        },
        //extraResolvers here

      },
      // introspection: process.env.NODE_ENV !== 'production'
    })

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const headers = req.headers.authorization
        const access_token = headers?.split(" ")[1]
        console.log(JSON.stringify(access_token, null, 2))
        const user = access_token
        // ? jwt.verify(access_token, `${process.env.ACCESS_KEY}`)
        // : undefined

        return { user }
      }
    })
  );
  return app
}