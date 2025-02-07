// routes/staking.routes.js
import { Router } from "express";
import { stakeOrdinal, broadcastTransaction } from "../Controller/stake.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();

// POST /stake - endpoint to prepare (stake) an ordinal
router.post("/stake", verifyJwt, stakeOrdinal);

// POST /broadcast - endpoint to broadcast the signed transaction
router.post("/broadcast", verifyJwt, broadcastTransaction);

export default router;
