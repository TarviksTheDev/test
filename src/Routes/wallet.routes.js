import { Router } from "express";
import { connectWallet} from "../Controller/wallet.controller.js"
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import "../Passport/index.js";
import "../Passport/index.js";

const router = Router();

router.route("/connect").get(verifyJwt, connectWallet);

export default router;
