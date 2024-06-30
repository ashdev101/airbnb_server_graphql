

const allowedOrigins = [
    'https://localhost:3000',
    'http://localhost:3000',
    "*",
    
];

export const corsOptions = {
    //@ts-ignore
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}