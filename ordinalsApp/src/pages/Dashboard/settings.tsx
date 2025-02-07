import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, TextField, Button, Switch, List, ListItem, Divider, Grid, Paper } from "@mui/material";
import { useWallet } from "../../Contexts/walletContext";
import { LoadingButton } from "@mui/lab";

const Settings: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { unisatInstalled, publicKey, disconnectWallet, address,connectWallet } = useWallet();
  const dispatch = useDispatch();

  // Local state to manage form data
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [walletAddress, setWalletAddress] = useState(user?.walletAddress || "");
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(user?.twoFactorAuth || false);

  // Handlers
  const handleUpdate = () => {
    // Dispatch action to update the user details
    dispatch({
      type: "UPDATE_USER",
      payload: {
        fullName,
        email,
        walletAddress,
        twoFactorAuth: isTwoFactorAuthEnabled,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        bgcolor: "transparent",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
        {/* Account Settings */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              backgroundImage: "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
              color: "#fff",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, color: "#fff" }}>
              Account Settings
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                fullWidth
                label="Wallet Address"
                value={address}
                onChange={(e) => setWalletAddress(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Two-Factor Authentication</Typography>
                <Switch
                  color="primary"
                  checked={isTwoFactorAuthEnabled}
                  onChange={(e) => setIsTwoFactorAuthEnabled(e.target.checked)}
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{ marginTop: 2 }}
            >
              Save Changes
            </Button>
          </Paper>
        </Grid>

        {/* Linked Wallets */}
{/* Linked Wallets */}
<Grid item xs={12}>
  <Paper
    sx={{
      padding: 3,
      backgroundImage: "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
      color: "#fff",
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ marginBottom: 2 }}>
      Linked Wallets
    </Typography>
    
    {unisatInstalled && address ? (
      <List>
        <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="body1">Connected Wallet</Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              {address}
            </Typography>
          </Box>
          <Button
            color="error"
            variant="contained"
            onClick={() => disconnectWallet()}
          >
            Unlink
          </Button>
        </ListItem>
      </List>
    ) : (
      <Typography variant="body2" sx={{ color: "#bbb", textAlign: "center" }}>
        No wallet connected
      </Typography>
    )}
    
    <Divider sx={{ marginY: 2, bgcolor: "transparent" }} />
    
    {!address && (
      <LoadingButton
      fullWidth
      color="inherit"
      size="large"
      type="submit"
      variant="contained"
      sx={{
        width: { xs: "100%", sm: "auto" },
        mx: "auto",
        px: { xs: 2, sm: 4 },
        backgroundImage: "linear-gradient(to right, #0AB7A6, #086259)",
        color: "white",
        "&:hover": {
          backgroundImage: "linear-gradient(to left, #0AB7A6, #086259)",
          color: "white",
        },
      }}
    >
      Connect Wallet
    </LoadingButton>
    )}
  </Paper>
</Grid>


        {/* Activity Logs */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
              backgroundImage: "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
              color: "#fff",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Activity Logs
            </Typography>
            <List>
              <ListItem>
                <Typography>Staking Reward Received: 0.0025 BTC (2h ago)</Typography>
              </ListItem>
              <Divider sx={{ bgcolor: "transparent" }} />
              <ListItem>
                <Typography>Hash Power Allocation Updated: Pool #2 → 75% (1d ago)</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
