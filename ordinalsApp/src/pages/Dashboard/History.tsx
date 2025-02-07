import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Stack,
} from "@mui/material";
import coin from "../../Assets/icons/coin.svg";
import {
  CurrencyBitcoin,
  GifBoxOutlined,
  GifBoxTwoTone,
  Percent,
  Redeem,
} from "@mui/icons-material";
const dummyData = [{}];

function History() {
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
      {/* Top Cards */}
      <Stack
        sx={{
          marginTop: 2,
          padding: 4,
          paddingBottom: 1,
          borderRadius: 2,
          background:
            "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Transaction History
        </Typography>
        <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#ffffe8" }}>Type</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Ordinal ID</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Amount</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Date</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
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
              ].map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.type}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.id}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell sx={{ color: "#fffff7" }}>
                    {transaction.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        transaction.status === "Completed"
                          ? "#1DB954"
                          : "#FFC107",
                    }}
                  >
                    <div
                      style={{
                        padding: "2px 6px",
                        backgroundColor:
                          transaction.status === "Completed"
                            ? "#18F16433"
                            : "#FFDF5D33",
                        width: "fit-content",
                        borderRadius: 4,
                      }}
                    >
                      {transaction.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack
        sx={{
          marginTop: 2,
          padding: 4,
          paddingBottom: 1,
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
                <TableCell sx={{ color: "#ffffe8" }}>Type</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Ordinal ID</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Amount</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Date</TableCell>
                <TableCell sx={{ color: "#ffffe8" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
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
              ].map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.type}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.id}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffe8" }}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell sx={{ color: "#fffff7" }}>
                    {transaction.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        transaction.status === "Completed"
                          ? "#1DB954"
                          : "#FFC107",
                    }}
                  >
                    <div
                      style={{
                        padding: "2px 6px",
                        backgroundColor:
                          transaction.status === "Completed"
                            ? "#18F16433"
                            : "#FFDF5D33",
                        width: "fit-content",
                        borderRadius: 4,
                      }}
                    >
                      {transaction.status}
                    </div>
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

export default History;
