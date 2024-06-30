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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const getCurrentUser_1 = require("../../../utils/getCurrentUser");
const mongodb_1 = require("../../../config/mongodb");
const listings_1 = require("../../../model/listings");
exports.resolvers = {
    Query: {
        getAllListings: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, mongodb_1.connectDB)();
                return yield listings_1.listing.find();
            }
            catch (err) {
                console.error(err);
                throw new Error("Internal server error");
            }
        }),
        getListingById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            try {
                yield (0, mongodb_1.connectDB)();
                return yield listings_1.listing.findById(id);
            }
            catch (err) {
                console.error(err);
                throw new Error("Internal server error");
            }
        }),
    },
    Mutation: {
        createListing: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            try {
                const currentUser = yield (0, getCurrentUser_1.getCurrentUser)(context);
                if (!currentUser) {
                    return { success: false, message: "Action not allowed. User not logged in." };
                }
                yield (0, mongodb_1.connectDB)();
                const newListing = new listings_1.listing({
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
                const savedListing = yield newListing.save();
                return { success: true, message: "Listing created successfully", listing: savedListing };
            }
            catch (err) {
                console.error(err);
                return { success: false, message: "Internal server error", listing: null };
            }
        }),
    },
};
