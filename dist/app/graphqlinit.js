"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqServer = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const listings_1 = require("./graphqlSchema/listings");
const graphqServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    const server = new server_1.ApolloServer({
        typeDefs: `
      ${listings_1.Listing.types}
        
        type Query  {
          ${listings_1.Listing.queries}
        }

        type Mutation {
          ${listings_1.Listing.mutations}
        }
      `,
        resolvers: {
            Query: Object.assign({}, listings_1.Listing.resolvers.Query),
            Mutation: Object.assign({}, listings_1.Listing.resolvers.Mutation),
            //extraResolvers here
        },
        // introspection: process.env.NODE_ENV !== 'production'
    });
    yield server.start();
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            const headers = req.headers.authorization;
            const access_token = headers === null || headers === void 0 ? void 0 : headers.split(" ")[1];
            console.log(JSON.stringify(access_token, null, 2));
            const user = access_token;
            // ? jwt.verify(access_token, `${process.env.ACCESS_KEY}`)
            // : undefined
            return { user };
        })
    }));
    return app;
});
exports.graphqServer = graphqServer;
