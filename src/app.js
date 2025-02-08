import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import fs from "fs";
import { createServer } from "http";
import passport from "passport";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yaml";
import {ApiError} from "./Utils/ApiErrors.js";
import bodyParser from "body-parser";
import { configDotenv } from 'dotenv';

configDotenv({ path: './development.env' })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

const httpServer = createServer(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1500, 
  standardHeaders: true, 
  legacyHeaders: false, 
  handler: (req, res, next, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${options.max} requests per ${
        options.windowMs / 60000
      } minutes`
    );
  },
});

app.use(express.static(path.join(__dirname, "../ordinalsApp/dist")));

app.use(limiter);

app.use(bodyParser.json({ limit: "20mb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session()); 

import {errorHandler} from "./Middlewares/error.middleware.js";
import userRouter from "./Routes/user.routes.js";
import walletRouter from "./Routes/wallet.routes.js"
import stakingRouter from "./Routes/staking.routes.js";

app.use("/mywallet/v1/auth", userRouter);
app.use("/mywallet/v1/wallet", walletRouter);
app.use("/mywallet/v1/staking", stakingRouter);

// app.use(
//   "/",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, {
//     swaggerOptions: {
//       docExpansion: "none",
//     },
//     customSiteTitle: "API docs",
//   })
// );

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../ordinalsApp/dist/index.html"));
});

app.use(errorHandler);

export { httpServer };
