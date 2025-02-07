import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


const connectWallet = asyncHandler(async (req, res) => {
    console.log("connectWalet");
    const unisat = window.unisat;
    console.log("UNISET",unisat);
    if(!unisat){
        throw new ApiError(409, "Unisat extension is not added");
    }
    
    return res
      .status(200)
      .json(new ApiResponse(200, "test", "wallet connected successfully"));
  });

 export {
    connectWallet
 } 