import { CircularProgress, Paper, Stack, styled } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LoadingScreen = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Item>
          <CircularProgress />
        </Item>
      </Stack>
    </>
  );
};

export default LoadingScreen;
