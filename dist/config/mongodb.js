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
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.MONGO_URI)
                return console.log('no connection string make sure there is...');
            // by saying ! i say that i know what i am doing it will alaways happen 
            mongoose_1.default.connect(process.env.MONGO_URI);
            const connection = mongoose_1.default.connection;
            connection.on('connected', () => {
                console.log('MongoDB connected successfully');
            });
            connection.on('error', (err) => {
                console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
                process.exit();
            });
        }
        catch (error) {
            console.log('Something goes wrong!');
            console.log(error);
        }
    });
}
