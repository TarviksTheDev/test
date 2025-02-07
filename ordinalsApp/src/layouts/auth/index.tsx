import { Stack, Box, Typography } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  if (isLoggedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, md: 4 },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: "75%", md: "50%" },
          textAlign: "center",
        }}
      >
        <Stack direction="column" alignItems="center" color="#fff">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: 20, sm: 24, md: 28 },
            }}
          >
            Welcome!
          </Typography>
        </Stack>
        <Outlet />
      </Stack>
    </Box>
  );
};

export default AuthLayout;
