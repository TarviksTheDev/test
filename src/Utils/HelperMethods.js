const crypto = require("crypto");

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export const hashOTP = (otp) =>
  crypto.createHash("sha256").update(otp.toString()).digest("hex");
