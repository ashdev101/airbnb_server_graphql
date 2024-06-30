"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = ` #graphql
  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: String
    image: String
    favouriteIds: [ID!]!
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
    locationValue: Location
    price: Float
    reservations: [ID!]!
    heartlist: [ID!]!
  }

  type Reservation {
    id: ID!
    listingid: ID!
    Userid: ID!
    startDate: String!
    endDate: String!
    totalPrice: Float!
  }

  type Account {
    id: ID!
    Userid: ID!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
  }

  input HeartInput {
    listingId: ID!
  }

  type Query {
    getCurrentUser: User
    getListing(id: ID!): Listing
    getReservationsByUser(userId: ID!): [Reservation!]!
  }

  type Mutation {
    addToFavorites(input: HeartInput!): String
    removeFromFavorites(input: HeartInput!): String
    createListing(
      Userid: ID!
      title: String!
      description: String!
      imageSrc: String
      category: String
      roomCount: Int
      bathroomCount: Int
      guestCount: Int
      locationValue: LocationInput
      price: Float!
    ): Listing!
  }

  input LocationInput {
    lat: Float
    lng: Float
    address: String
  }

  type Location {
    lat: Float
    lng: Float
    address: String
  }
`;
