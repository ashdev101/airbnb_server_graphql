"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

    type User {
        id: ID!
        name: String!
        email: String!
        emailVerified: String
        image: String
        favouriteIds: [ID!]
    }

    type Listing {
        id: ID!
        Userid: ID!
        title: String!
        description: String!
        imageSrc: String
        category: String
        roomCount: Int
        bathroomCount: Int
        guestCount: Int
        locationValue: String
        price: Float
        reservations: [ID!]
        heartlist: [ID!]
    }

    type MutationResponse {
        success: Boolean!
        message: String
    }

`;
