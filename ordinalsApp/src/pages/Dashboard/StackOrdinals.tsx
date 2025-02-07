import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Stack,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  TextField,
  CardMedia,
  Modal,
  IconButton,
} from "@mui/material";
import { CurrencyBitcoin, Percent, Redeem } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReactECharts from "echarts-for-react";
import { useWallet } from "../../Contexts/walletContext";
import { stakeOrdinal as apiStakeOrdinal, broadcastTransaction as apiBroadcastTransaction } from "../../Api/index";
import { add } from "lodash";


// Sample Data
const rewardHistory = [
  {
    type: "Stake",
    id: "#1234",
    amount: "0.5 BTC",
    date: "Jan 12, 2025",
    status: "Completed",
  },
  {
    type: "Unstake",
    id: "#5678",
    amount: "0.3 BTC",
    date: "Jan 12, 2025",
    status: "Completed",
  },
  {
    type: "Reward",
    id: "#9012",
    amount: "0.05 BTC",
    date: "Jan 12, 2025",
    status: "Pending",
  },
];

const statCards = [
  {
    title: "Total Bitcoin Rewards",
    value: "156.34 BTC",
    change: "+2.4% this week",
    icon: <CurrencyBitcoin sx={{ color: "#0AB7A617", fontSize: 100 }} />,
  },
  {
    title: "Current Hashing Power",
    value: "284.5 TH/s",
    change: "+5.3% today",
    icon: <Percent sx={{ color: "#0AB7A617", fontSize: 100 }} />,
  },
  {
    title: "Active Hashrates",
    value: "198.2 TH/s",
    change: "Live",
    icon: <Redeem sx={{ color: "#0AB7A617", fontSize: 100 }} />,
  },
];

// Chart Configurations
const chartOptions = {
  backgroundColor: "rgba(5,50,46,1)", // ✅ Set background color here
  xAxis: {
    type: "category",
    data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    axisLine: { lineStyle: { color: "#ffffff" } }, // White axis lines
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#ffffff" } },
    splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } }, // Light grid lines
  },
  series: [
    {
      data: [300, 500, 700, 600, 800, 650],
      type: "line",
      smooth: true,
      areaStyle: { color: "rgba(0,255,180,0.2)" }, // Light green area fill
      lineStyle: { color: "#00ffb4" }, // Line color
    },
  ],
};

const tiers = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

function StackOrdinals() {
  const [ordinalCount, setOrdinalCount] = useState(1);
  const [selectedTier, setSelectedTier] = useState("Common");



  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "transparent",
        color: "#fff",
        flexGrow: 1,
        paddingTop: 0,
      }}
    >
      {/* Top Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                backgroundImage:
                  "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
                color: "#fff",
                borderRadius: 2,
                minHeight: 140,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography sx={{ mt: 2, fontSize: 30, fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#1DB954" }}>
                    {item.change}
                  </Typography>
                </Stack>
                {item.icon}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Online Workers Section */}
      <Stack
        sx={{
          p: 4,
          pb: 1,
          borderRadius: 2,
          background:
            "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Online Workers
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3, minHeight: 300 }}>
          <Grid item xs={12}>
            <iframe
              src="https://hiveon.net/btc/dashboard?account=asicgenesis&token=741cf686-c43b-49e0-9a9b-cf19709a4f05"
              title="Online Workers Dashboard"
              style={{
                width: "100%",
                height: "300px",
                border: "none",
                borderRadius: "8px",
              }}
            />
          </Grid>
        </Grid>
      </Stack>

      {/* current work */}

      <Stack
  sx={{
    mt: 4,
    p: { xs: 2, sm: 4 }, // Adjust padding for small screens
    pb: 1,
    borderRadius: 2,
    background: "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
  }}
>
<OrdinalsList/>
</Stack>



      
      {/* Live Hash Power & Stake Model (Row Layout) */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* Stake Model */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "rgba(0, 20, 20, 0.9)",
              color: "#fff",
              boxShadow: "0px 4px 12px rgba(0,255,180,0.1)",
              background:
                "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Stake Your Ordinals
            </Typography>
            <Stack spacing={1}>
              <Typography
                sx={{
                  fontWeight: 200,
                  color: "#fefefe",
                  textAlign: "left",
                  fontSize: 13,
                }}
              >
                Number of Ordinals
              </Typography>
              {/* Number of Ordinals Input */}
              <TextField
                fullWidth
                InputLabelProps={{ shrink: false }}
                variant="outlined"
                value={ordinalCount}
                onChange={(e) => setOrdinalCount(Number(e.target.value))}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  },
                }}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography
                sx={{
                  fontWeight: 200,
                  color: "#fefefe",
                  textAlign: "left",
                  fontSize: 13,
                }}
              >
                Select Tier
              </Typography>
              {/* Tier Selection Dropdown */}
              <TextField
                select
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  },
                }}
              >
                {tiers.map((tier) => (
                  <MenuItem key={tier} value={tier}>
                    {tier}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Stake Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                width: { xs: "100%", sm: "100%" },
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
              STAKE NOW
            </Button>

            <Stack
              spacing={1}
              sx={{
                p: 1.5,
                marginTop: 3,
                borderRadius: 3,
                color: "#ffff",
                boxShadow: "0px 3px 10px rgba(0,255,180,0.1)",
              }}
            >
              {/* Estimated Rewards */}
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Estimated Daily Rewards
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                ₿ 0.0045
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* Live Hash Power Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              background:
                "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
              boxShadow: "0px 4px 12px rgba(0,255,180,0.1)",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
                Live Hash Power
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                hiddenLabel
                onChange={() => {}}
                sx={{
                  fontSize: "0.8rem", // Smaller font
                  padding: "4px", // Adjust padding
                  height: 30, // Smaller height
                  color: "#fff",
                  borderColor: "#fff",
                }}
              >
                <MenuItem
                  value={10}
                  sx={{ fontSize: "0.8rem", padding: "4px" }}
                >
                  Today
                </MenuItem>
                <MenuItem
                  value={20}
                  sx={{ fontSize: "0.8rem", padding: "4px" }}
                >
                  Week
                </MenuItem>
                <MenuItem
                  value={30}
                  sx={{ fontSize: "0.8rem", padding: "4px" }}
                >
                  Month
                </MenuItem>
              </Select>
            </Stack>

            <ReactECharts
              option={chartOptions}
              style={{
                height: 320,
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "rgba(5,50,46,1)",
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Reward History Table */}
      <Stack
        sx={{
          mt: 3,
          p: 4,
          pb: 1,
          borderRadius: 2,
          background:
            "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reward History
        </Typography>
        <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
          <Table>
            <TableHead>
              <TableRow>
                {["Date", "Hash Power", "Reward Amount", "Status"].map(
                  (header, index) => (
                    <TableCell
                      key={index}
                      sx={{ color: "#ffffe8", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardHistory.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#ffffe8" }}>{row.date}</TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>{row.id}</TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>{row.amount}</TableCell>
                  <TableCell
                    sx={{
                      color: row.status === "Completed" ? "#1DB954" : "#FFC107",
                      fontWeight: "bold",
                    }}
                  >
                    <Box
                      sx={{
                        p: "2px 6px",
                        backgroundColor:
                          row.status === "Completed"
                            ? "#18F16433"
                            : "#FFDF5D33",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default StackOrdinals;



interface Ordinal {
  txid: string;
  vout: number;
  satoshi: number;
  inscription: {
    inscriptionId: string;
  } | null;
}

const OrdinalsList = () => {
  const [ordinals, setOrdinals] = useState<Ordinal[]>([]);
  const [selectedOrdinal, setSelectedOrdinal] = useState<Ordinal | null>(null);
  const [isStaked, setIsStaked] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const { address } = useWallet();

  useEffect(() => {
    const fetchOrdinals = async () => {
      try {
        const response = await fetch(
          `https://open-api-testnet.unisat.io/v1/indexer/address/${address}/inscription-utxo-data?cursor=0&size=16`
        );
        if (response.ok) {
          const { data } = await response.json();
          const processedOrdinals = data.utxo.map((item: any) => ({
            txid: item.txid,
            vout: item.vout,
            satoshi: item.satoshi,
            inscription: item.inscriptions[0] || null,
          }));
          setOrdinals(processedOrdinals);
        } else {
          console.log("Failed to fetch ordinals.");
        }
      } catch (err) {
        console.error("Error fetching ordinals.", err);
      }
    };

    fetchOrdinals();
  }, [address]);

  const handleStakeOrdinal = async (ordinal: Ordinal) => {
    try {
      // 1. Call staking API
      const stakeResponse = await apiStakeOrdinal({
        txid: ordinal.txid,
        vout: ordinal.vout,
        clientWalletAddress: address,
        satoshi: ordinal.satoshi,
      });

      const { psbtHex } = stakeResponse.data.message;
      console.log("PSBT created:", psbtHex);
      debugger
      // 2. Sign PSBT with UniSat
      const unisat = (window as any).unisat;
      if (unisat && unisat.signPsbt) {
        const signedPsbt = await unisat.signPsbt(psbtHex, { autoFinalized: true });

        // 3. Broadcast transaction
        const broadcastRes = await apiBroadcastTransaction(signedPsbt);
        debugger
        setTransactionId(broadcastRes.data.message);
        setIsStaked(true);
      } else {
        throw new Error("UniSat wallet not available.");
      }
    } catch (err: any) {
      console.error("Error staking ordinal:", err.message);
    }
  };

  const handleCopyTransactionId = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "start", fontSize: { xs: 18, sm: 24 } }}>
        Your Ordinals
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
        {ordinals.map((ordinal, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              onClick={() => setSelectedOrdinal(ordinal)}
              sx={{
                p: 1,
                background: "#0A3B3533",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { cursor: "pointer", transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                sx={{ p: 1, borderRadius: 2, objectFit: "cover" }}
                component="img"
                height="250"
                image={
                  "https://s3-alpha-sig.figma.com/img/53aa/1f2c/231579afc94ead9777f445dae3c0c1af?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jHMJjDW~Ym-0WvPmamVMJg4M1JqWikTos8dpUVgQxaozhvZ-Bw646JF8m-drq6PVfQ-TeOkHOWnIE8QII4pkQDTNWPGxJw7gnxlYQgFsM8zGt7R9ziXxhRrae7jaG7IwJi00ewvALGkn5zAPTYfIZtpbmdUgvA0O44X929nPxJcDeNrrKF~4ULtYdkrBoIWQ0sPVZGuNycDCD5jS2QgP-8duLfM55wNVEQXyA-~BeAnBuMKw6oZDrtT5vBL8wqHL5DXaoMGLQL~yg6-IQHqsXmw-MtiIg6fLYaUnTsP6ltWrKNw2Z0TR4w-tUvTh3lQ3s1D6v9-byJqOJtX1NphjLQ__"
                }
                alt={`Ordinal ${ordinal.txid}`}
              />
              <CardContent sx={{ color: "#ffffe8", textAlign: "center" }}>
                <Typography fontSize={{ xs: 13, sm: 15 }}>
                  Ordinal #{ordinal.inscription?.inscriptionId} <br />
                  Satoshi {ordinal.satoshi}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Staking */}
      <Modal open={!!selectedOrdinal} onClose={() => setSelectedOrdinal(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 4,
        borderRadius: 3,
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
            width: 400,
            p: 4,
          }}
        >
          <Card
              onClick={() => setSelectedOrdinal(selectedOrdinal)}
              sx={{
                p: 1,
                background: "#0A3B3533",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { cursor: "pointer", transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                sx={{ p: 1, borderRadius: 2, objectFit: "cover" }}
                component="img"
                height="250"
                image={
                  "https://s3-alpha-sig.figma.com/img/53aa/1f2c/231579afc94ead9777f445dae3c0c1af?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jHMJjDW~Ym-0WvPmamVMJg4M1JqWikTos8dpUVgQxaozhvZ-Bw646JF8m-drq6PVfQ-TeOkHOWnIE8QII4pkQDTNWPGxJw7gnxlYQgFsM8zGt7R9ziXxhRrae7jaG7IwJi00ewvALGkn5zAPTYfIZtpbmdUgvA0O44X929nPxJcDeNrrKF~4ULtYdkrBoIWQ0sPVZGuNycDCD5jS2QgP-8duLfM55wNVEQXyA-~BeAnBuMKw6oZDrtT5vBL8wqHL5DXaoMGLQL~yg6-IQHqsXmw-MtiIg6fLYaUnTsP6ltWrKNw2Z0TR4w-tUvTh3lQ3s1D6v9-byJqOJtX1NphjLQ__"
                }
                alt={`Ordinal ${selectedOrdinal?.txid}`}
              />
              <CardContent sx={{ color: "#ffffe8", textAlign: "center" }}>
                <Typography fontSize={{ xs: 13, sm: 15 }}>
                  Ordinal #{selectedOrdinal?.inscription?.inscriptionId} <br />
                  Satoshi {selectedOrdinal?.satoshi}
                </Typography>
              </CardContent>
            </Card>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2, color:"#fff",mt:2 }}>
            {isStaked ? "Ordinal Staked Successfully" : "Stake This Ordinal"}
          </Typography>

          {isStaked ? (
            <>
              <Typography sx={{ textAlign: "center", color: "green", mb: 2 }}>
                <CheckCircleIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Ordinal Staked Successfully!
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Transaction ID:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                }}
              >
                <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {transactionId}
                </Typography>
                <IconButton onClick={handleCopyTransactionId}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  mt:4,
                  mx: "auto",
                  px: { xs: 2, sm: 4 },
                  backgroundImage: "linear-gradient(to right, #0AB7A6, #086259)",
                  color: "white",
                  "&:hover": {
                    backgroundImage: "linear-gradient(to left, #0AB7A6, #086259)",
                    color: "white",
                  },
                }}
                onClick={() => {
                  setSelectedOrdinal(null);
                  setIsStaked(false);
                  setTransactionId(null);
                }}
              >
                Close
              </Button>
            </>
          ) : (
            <Stack sx={{alignContent:"center",display:"flex",flexDirection:"row"}}>
            <Button
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
              onClick={() => selectedOrdinal && handleStakeOrdinal(selectedOrdinal)}
            >
              Stack Ordinal
            </Button>
            <Button
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
              onClick={() => setSelectedOrdinal(null)}
            >
              Close
            </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
