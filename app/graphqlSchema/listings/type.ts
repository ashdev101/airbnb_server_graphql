export const types = `#graphql

    type User {
        id: ID!
        name: String!
        email: String!
        emailVerified: String
        image: String
        favouriteIds: [ID!]
    }

    type LatLong {
        lat: Float
        long: Float
    }

    type LocationValue {
        name: String
        region: String
        latlong: [LatLong]
        flag: String
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
        locationValue: LocationValue
        price: Float
        reservations: [ID!]
        heartlist: [ID!]
    }


    input ListingInput {
        title: String!
        description: String!
        imageSrc: String
        category: String
        roomCount: Int
        bathroomCount: Int
        guestCount: Int
        locationValue: String
        price: Float
    }

    type MutationResponse {
        success: Boolean!
        message: String
        listing: Listing
    }

`;
