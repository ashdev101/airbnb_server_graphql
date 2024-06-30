"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql

    addToFavorites(listingId: ID!): MutationResponse!
    removeFromFavorites(listingId: ID!): MutationResponse!

`;
