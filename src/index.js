import { configDotenv } from 'dotenv';
import connectDb from './DB/index.js';
import { httpServer } from './app.js';

configDotenv({ path: './development.env' })

const startServer = () => {
    httpServer.listen(process.env.PORT || 8080, () => {
        console.info(
            `📑 Visit the documentation at: http://localhost:${process.env.PORT || 7000
            }`
        );
        console.log("⚙️  Server is running on port: " + process.env.PORT);
    });
};
connectDb();
startServer();