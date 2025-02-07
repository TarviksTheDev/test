import React, { createContext, useContext, useEffect, useState } from "react";
import { ChainType } from "../Data/const";

interface WalletContextType {
  unisatInstalled: boolean;
  connected: boolean;
  accounts: string[];
  publicKey: string;
  address: string;
  balance: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
  network: string;
  version: string;
  chainType: ChainType;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void; // New function to disconnect
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("testnet");
  const [version, setVersion] = useState("");
  const [chainType, setChainType] = useState<ChainType>(ChainType.BITCOIN_MAINNET);

  useEffect(() => {
    // Check if UniSat is installed
    if ((window as any).unisat) {
      setUnisatInstalled(true);
    } else {
      setUnisatInstalled(false);
    }

    // Restore wallet connection from localStorage
    const storedAddress = localStorage.getItem("unisat_address");
    const storedAccounts = localStorage.getItem("unisat_accounts");
    const storedPublicKey = localStorage.getItem("unisat_publicKey");

    if (storedAddress && storedAccounts) {
      setAddress(storedAddress);
      setAccounts(JSON.parse(storedAccounts));
      setPublicKey(storedPublicKey || "");
      setConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    const unisat = (window as any).unisat;

    if (!unisat) {
      window.location.href = "https://unisat.io";
      return;
    }

    try {
      const accounts = await unisat.requestAccounts();
      setAccounts(accounts);
      setConnected(true);
      setAddress(accounts[0]);

      // Store data in localStorage
      localStorage.setItem("unisat_accounts", JSON.stringify(accounts));
      localStorage.setItem("unisat_address", accounts[0]);

      // Fetch additional wallet info
      await getBasicInfo(unisat);
    } catch (error: any) {
      console.error("Error connecting to UniSat Wallet:", error);
      alert("Failed to connect to the wallet. Please try again.");
    }
  };

  const getBasicInfo = async (unisat: any) => {
    try {
      const accounts = await unisat.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }

    try {
      const publicKey = await unisat.getPublicKey();
      setPublicKey(publicKey);
      localStorage.setItem("unisat_publicKey", publicKey);
    } catch (error) {
      console.error("Error fetching public key:", error);
    }

    try {
      const balance = await unisat.getBalance();
      setBalance(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }

    try {
      const chain = await unisat.getChain();
      setChainType(chain.enum);
    } catch (error) {
      console.error("Error fetching chain type:", error);
    }

    try {
      const network = await unisat.getNetwork();
      setNetwork(network);
    } catch (error) {
      console.error("Error fetching network:", error);
    }

    try {
      const version = await unisat.getVersion();
      setVersion(version);
    } catch (error) {
      console.error("Error fetching version:", error);
    }

    try {
      const address = await unisat.getAccounts();
      setAddress(address[0]);
      localStorage.setItem("unisat_address", address[0]);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccounts([]);
    setPublicKey("");
    setAddress("");
    setBalance({ confirmed: 0, unconfirmed: 0, total: 0 });
    setNetwork("testnet");
    setVersion("");
    setChainType(ChainType.BITCOIN_MAINNET);

    // Clear localStorage
    localStorage.removeItem("unisat_accounts");
    localStorage.removeItem("unisat_address");
    localStorage.removeItem("unisat_publicKey");

    console.log("Disconnected from UniSat.");
  };

  return (
    <WalletContext.Provider
      value={{
        unisatInstalled,
        connected,
        accounts,
        publicKey,
        address,
        balance,
        network,
        version,
        chainType,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
