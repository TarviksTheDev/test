import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography, useTheme } from "@mui/material";
import Login from "../../Sections/Auth/LoginForm";
import AuthSocial from "../../Sections/Auth/AuthSocial";

export default function LoginPage() {
  const theme = useTheme();

  return (
    <Stack
      spacing={0.5}
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: 4,
        borderRadius: 3,
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          marginBottom: 2,
        }}
      >
        Please login to continue
      </Typography>
      <AuthSocial />
      <Login />
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          marginTop: "20px !important",
        }}
      >
        Don’t have an account?{" "}
        <Link
          component={RouterLink}
          to="/auth/register"
          underline="hover"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          Sign up
        </Link>
      </Typography>
    </Stack>
  );
}
