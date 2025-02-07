// controllers/stake.controller.js
import bitcoin from "bitcoinjs-lib";
import fetch from "node-fetch"; // if you're using Node.js v18+, global fetch is available
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiErrors.js"; // your custom error class, if any
// Removed: import { Ordinal } from "../Models/Ordinal.js";

/**
 * stakeOrdinal: Constructs a PSBT with a time-lock script.
 */
const stakeOrdinal = asyncHandler(async (req, res) => {
  const { txid, vout, clientWalletAddress, satoshi } = req.body;

  if (!txid || vout === undefined || !clientWalletAddress || !satoshi) {
    throw new ApiError(400, "Incomplete staking data.");
  }

  // Set a hardcoded 2-hour lock (7200 seconds)
  const lockTime = Math.floor(Date.now() / 1000) + 7200;
  console.log("LockTime (2 hours):", lockTime);

  const feeRate = 1; // example fee rate (sats/vByte)
  const estimatedSize = 180; // approximate size for 1 input / 1 output
  const fee = feeRate * estimatedSize;

  if (satoshi <= fee) {
    throw new ApiError(
      400,
      `Insufficient sats for fee. Ordinal has ${satoshi}, fee is ${fee}.`
    );
  }

  // Create a new PSBT
  // Adjust the network as needed for live site (mainnet vs. testnet)
  const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

  // Convert the client's wallet address into an output script
  const clientWalletScript = bitcoin.address.toOutputScript(
    clientWalletAddress,
    bitcoin.networks.testnet
  );
  psbt.addInput({
    hash: txid,
    index: vout,
    witnessUtxo: {
      script: clientWalletScript,
      value: satoshi,
    },
  });

  // Create a time-lock (CLTV) script that still belongs to the clientWalletAddress
  const lockScript = bitcoin.script.compile([
    bitcoin.script.number.encode(lockTime),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    clientWalletScript,
  ]);

  // Subtract the fee from the available sats and add an output with the locking script
  const sendValue = satoshi - fee;
  psbt.addOutput({
    script: lockScript,
    value: sendValue,
  });

  // Log staking info (replace this with your preferred tracking method)
  console.log(`Staking info: { txid: ${txid}, vout: ${vout}, lockTime: ${lockTime} }`);

  console.log("Constructed PSBT with Locking Script:", psbt.toHex());

  return res
    .status(200)
    .json(
      new ApiResponse(200, "PSBT created successfully", {
        psbtHex: psbt.toHex(),
      })
    );
});

/**
 * broadcastTransaction: Extracts the raw transaction from the signed PSBT and broadcasts it.
 */
const broadcastTransaction = asyncHandler(async (req, res) => {
  const { signedPsbt } = req.body;

  if (!signedPsbt) {
    throw new ApiError(400, "No signed transaction provided.");
  }

  // Parse the signed PSBT and extract the raw transaction (txHex)
  const psbt = bitcoin.Psbt.fromHex(signedPsbt);
  const txHex = psbt.extractTransaction().toHex();
  console.log("Extracted txHex:", txHex);

  // Send the txHex to the broadcast API
  const response = await fetch(
    "https://open-api-testnet.unisat.io/v1/indexer/local_pushtx",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Replace with your actual authorization token
        Authorization:
          "Bearer 6a5463d904378da5cb83b0171c2f3cf0976dc707ec9920d656cb81d1f05130b1",
      },
      body: JSON.stringify({ txHex, maxFeeRate: 0.1 }),
    }
  );

  const result = await response.json();
  console.log("Broadcast Response:", result);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      result.error || "Error broadcasting transaction"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Transaction broadcasted successfully", result.data)
    );
});

export { stakeOrdinal, broadcastTransaction };
