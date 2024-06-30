// import { ObjectId } from 'mongodb';
// import { User } from '../../../model/user';
// import { listing } from '../../../model/listings';
// import { connectDB } from '../../../config/mongodb';

// export const resolvers = {
//     Query: {
//         getCurrentUser: async (_: any, __: any, context: any) => {
//             const currentUser = await getCurrentUser(context);
//             if (!currentUser) {
//                 throw new Error("User not authenticated");
//             }
//             return await User.findById(currentUser._id);
//         },
//     },
//     Mutation: {
//         addToFavorites: async (_: any, { listingId }: any, context: any) => {
//             try {
//                 if (!listingId) {
//                     return { success: false, message: "Invalid ID" };
//                 }

//                 const currentUser = await getCurrentUser(context);
//                 if (!currentUser) {
//                     return { success: false, message: "Action not allowed. Kindly login." };
//                 }

//                 await connectDB();
//                 const objectIdListingId = new ObjectId(listingId);
//                 const currentListing = await listing.findById(objectIdListingId);

//                 if (!currentListing) {
//                     return { success: false, message: "Listing not found." };
//                 }

//                 if (!currentListing.heartlist.includes(currentUser._id)) {
//                     currentListing.heartlist.push(currentUser._id);
//                     await currentListing.save();

//                     const user = await User.findById(currentUser._id);
//                     if (user && !user.favouriteIds.includes(currentListing._id)) {
//                         user.favouriteIds.push(currentListing._id);
//                         await user.save();
//                     }

//                     return { success: true, message: "Hearted successfully" };
//                 }

//                 return { success: false, message: "Already in favorites." };
//             } catch (err) {
//                 console.error(err);
//                 return { success: false, message: "Internal server error" };
//             }
//         },

//         removeFromFavorites: async (_: any, { listingId }: any, context: any) => {
//             try {
//                 if (!listingId) {
//                     return { success: false, message: "Invalid ID" };
//                 }

//                 const currentUser = await getCurrentUser(context);
//                 if (!currentUser) {
//                     return { success: false, message: "Action not allowed. Kindly login." };
//                 }

//                 await connectDB();
//                 const objectIdListingId = new ObjectId(listingId);
//                 const currentListing = await listing.findById(objectIdListingId);

//                 if (!currentListing) {
//                     return { success: false, message: "Listing not found." };
//                 }

//                 currentListing.heartlist = currentListing.heartlist.filter(
//                     (item: any) => item.toString() !== currentUser._id.toString()
//                 );
//                 await currentListing.save();

//                 const user = await User.findById(currentUser._id);
//                 if (user) {
//                     user.favouriteIds = user.favouriteIds.filter(
//                         (item: any) => item.toString() !== currentListing._id.toString()
//                     );
//                     await user.save();
//                 }

//                 return { success: true, message: "Heart removed successfully" };
//             } catch (err) {
//                 console.error(err);
//                 return { success: false, message: "Internal server error" };
//             }
//         },
//     },
// };
