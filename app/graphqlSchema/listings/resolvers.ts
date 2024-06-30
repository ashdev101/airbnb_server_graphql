

import { ObjectId } from 'mongodb';
import { getCurrentUser } from '../../../utils/getCurrentUser';
import { connectDB } from '../../../config/mongodb';
import { listing } from '../../../model/listings';

export const resolvers = {
    Query: {
        getAllListings: async () => {
            try {
                await connectDB();
                return await listing.find();
            
            } catch (err) {
                console.error(err);
                throw new Error("Internal server error");
            }
        },

        getListingById: async (_: any, { id }: { id: string }) => {
            try {
                await connectDB();
                return await listing.findById(id);
            } catch (err) {
                console.error(err);
                throw new Error("Internal server error");
            }
        },
    },

    Mutation: {
        createListing: async (_: any, { input }: any, context: any) => {
            try {
                const currentUser = await getCurrentUser(context);
                if (!currentUser) {
                    return { success: false, message: "Action not allowed. User not logged in." };
                }

                await connectDB();
                const newListing = new listing({
                    Userid: currentUser._id,
                    title: input.title,
                    description: input.description,
                    imageSrc: input.imageSrc,
                    category: input.category,
                    roomCount: input.roomCount,
                    bathroomCount: input.bathroomCount,
                    guestCount: input.guestCount,
                    locationValue: input.locationValue,
                    price: input.price,
                });

                const savedListing = await newListing.save();
                return { success: true, message: "Listing created successfully", listing: savedListing };
            } catch (err) {
                console.error(err);
                return { success: false, message: "Internal server error", listing: null };
            }
        },
    },
};
