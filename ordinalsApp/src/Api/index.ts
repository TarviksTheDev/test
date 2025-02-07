// Import necessary modules and utilities
import axios from "axios";
import { store } from "../redux/store";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    const state = store.getState();
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${state.auth.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// For creating form data
const createFormData = (
  data: Record<string, any>,
  notAllowedKeys: string[]
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (!notAllowedKeys.includes(key)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
};

// API functions for different actions
const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/mywallet/v1/auth/login", data);
};

const registerUser = (data: {
  email: string;
  password: string;
  userName: string;
}) => {
  return apiClient.post("/mywallet/v1/auth/register", data);
};

const logoutUser = () => {
  return apiClient.post("/mywallet/v1/auth/logout");
};

const updateUser = (user: any) => {
  const formData = createFormData(user, ["pic", "uploadPic"]);
  if (user.uploadPic) {
    formData.append("pic", user.uploadPic);
  }
  return apiClient.post(`/mywallet/v1/auth/update-user`, formData);
};

const connectWallet = () => {
  return apiClient.get("/mywallet/v1/wallet/connect");
};

// Function to request a staking PSBT from the backend
const stakeOrdinal = (payload: {
  txid: string;
  vout: number;
  clientWalletAddress: string;
  satoshi: number;
}) => {
  return apiClient.post("/mywallet/v1/staking/stake", payload);
};

// Function to broadcast a signed PSBT to the backend
const broadcastTransaction = (signedPsbt: string) => {
  return apiClient.post("/mywallet/v1/staking/broadcast", { signedPsbt });
};
// Export all the API functions
export {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  connectWallet,
  stakeOrdinal,
  broadcastTransaction
};
