import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { Nav_Buttons } from "../../Data";
import { CircleNotifications } from "@mui/icons-material";
import { useSelector } from "../../redux/store";
import { useWallet } from "../../Contexts/walletContext";

function Header() {
  const [currentTab, setcurrentTab] = useState<string>("");
  const { user } = useSelector((state: any) => state.auth);
  const { unisatInstalled, connected, connectWallet } = useWallet();

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedTab = Nav_Buttons.find(
      (item) => item.path === currentPath.split("/")[1]
    );
    setcurrentTab(matchedTab ? matchedTab.text : "Home");
  }, [location.pathname]);

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="#fff">
          {currentTab}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={user.pic} alt="User" />
            <IconButton>
              <CircleNotifications fontSize="large" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #0AB7A6, #086259)",
              color: "white",
              "&:hover": {
                backgroundImage: "linear-gradient(to left, #0AB7A6, #086259)",
                color: "white",
              },
              textTransform: "none",
            }}
            onClick={connectWallet}
          >
            {connected ? "Wallet Connected" : unisatInstalled ? "Connect Wallet" : "Install UniSat"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
