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
import { CurrencyBitcoin, Percent, Redeem } from "@mui/icons-material";

const dummyData = [{}];

function Dashboard() {
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
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: "Total Staked",
            value: "12.45 BTC",
            change: "+2.4% from last month",
            icon: (
              <CurrencyBitcoin sx={{ color: "#0AB7A617", fontSize: 125 }} />
            ),
          },
          {
            title: "Current APY",
            value: "8.2%",
            change: "-0.5% from last week",
            icon: <Percent sx={{ color: "#0AB7A617", fontSize: 125 }} />,
          },
          {
            title: "Rewards Earned",
            value: "0.85 BTC",
            change: "+0.12 BTC this month",
            icon: <Redeem sx={{ color: "#0AB7A617", fontSize: 125 }} />,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ minHeight: 150 }}>
            <Paper
              sx={{
                p: 2,
                backgroundImage:
                  "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
                color: "#fff",
                borderRadius: 2,
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignContent={"flex-end"}
              >
                <Stack height={"100%"}>
                  <span>{item.title}</span>
                  <Typography sx={{ marginTop: 3, fontSize: 35 }}>
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

      <Stack
        sx={{
          padding: 4,
          paddingBottom: 1,
          borderRadius: 2,
          background:
            "linear-gradient(165deg, rgba(2,26,26,1) 0%, rgba(5,50,46,1) 47%)",
        }}
      >
        {/* Staked Ordinals */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your Staked Ordinals
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            {
              ordinal: "",
              name: "",
              image:
                "https://s3-alpha-sig.figma.com/img/53aa/1f2c/231579afc94ead9777f445dae3c0c1af?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jHMJjDW~Ym-0WvPmamVMJg4M1JqWikTos8dpUVgQxaozhvZ-Bw646JF8m-drq6PVfQ-TeOkHOWnIE8QII4pkQDTNWPGxJw7gnxlYQgFsM8zGt7R9ziXxhRrae7jaG7IwJi00ewvALGkn5zAPTYfIZtpbmdUgvA0O44X929nPxJcDeNrrKF~4ULtYdkrBoIWQ0sPVZGuNycDCD5jS2QgP-8duLfM55wNVEQXyA-~BeAnBuMKw6oZDrtT5vBL8wqHL5DXaoMGLQL~yg6-IQHqsXmw-MtiIg6fLYaUnTsP6ltWrKNw2Z0TR4w-tUvTh3lQ3s1D6v9-byJqOJtX1NphjLQ__",
            },
            {
              ordinal: "",
              name: "",
              image:
                "https://s3-alpha-sig.figma.com/img/f815/5b95/d642a2c32be49fc5d53f7adfd57c6ad0?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i8STuSZsMC4Jrsp-OYhHjDMt7xTWFhMDZZ7JDuBrpy1NRW18E2sgaKlPOeUBjE8xaj-lFjOWJX9X4cZTXboTQYFIxjuJiYGq8HYmjgTW65-wy7wDf0yWSfor-uCaaO4J-vmpPfWqx8YtAC-omI3VQtG79-mXOWQNvgKhHXneQCApbKkRJzsqbclJs96lytGHBcmAB81s8Kx5rJTkz1nZ5AYsgnSykFjWda0BQDXDPqq92kmVfFzvgTuxiAcGgtwqyBS2Q8ABPrJOeHaIp~kpWnirhJgr5phPXqj~lrhLkhxeDM0o92PqSVqoSgAZKe-qWeJc0MTXLumYb36KN5pAKQ__",
            },
            {
              ordinal: "",
              name: "",
              image:
                "https://s3-alpha-sig.figma.com/img/aa41/04fd/496916d07074c6c42bfa0fefd393d497?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JG8X3izHCK1AahR-R61m2Mox4hv54VH518yuzGIcerT6kOIycIv0rExIIXqt88u5SUavZTdsVuD05~GMaDfSpP~68521MdMEzrmR~FrZybNlgDKPBYr-kGqGbJy0AwtJKjxN3JGAOmJhzoS6HXbao5CgZcl3eHfRCBVPvISHBH5LJCuaniImxabb3a8rpEHSm2cQLZgkRTxEM-7MyJ-w45GYgayVcfQxDu-V1Ov~pzQtk8EAGCbpgdngxZAbWz2-MRfW6RDYiM9AUb7YZp3rV3GgZQ6~qMHsqJE1Um9ZsnXEqfzdBpEhLGjt81KEt6~kR8aOJsI-E-DrFrF4ejwOgw__",
            },
          ].map((ordinal, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ padding: 0.7, background: "#0A3B3533" }}>
                {/* Image Section */}
                <CardMedia
                  sx={{ padding: 1, borderRadius: 2 }}
                  component="img"
                  height="280"
                  image={ordinal.image}
                  alt={`Ordinal ${ordinal.name}`}
                />
                <CardContent sx={{ color: "#ffffe8" }}>
                  <Typography fontSize={20}>
                    Ordinal #{ordinal.ordinal}1234
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 15 }}>Staked 30 days</span>
                    <span style={{ fontSize: 15 }}>Rewards: 0.05 BTC</span>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
        {/* Recent Transactions */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Recent Transactions
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "transparent", border: "none" }}
        >
          <Table sx={{ border: "none" }}>
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
                <TableRow
                  key={index}
                  sx={{ borderBottom: "1px solid #ffffff80" }}
                >
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

export default Dashboard;
