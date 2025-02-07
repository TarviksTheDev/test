// @mui
import { Stack, Typography, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../Sections/Auth/RegisterForm";
import AuthSocial from "../../Sections/Auth/AuthSocial";

// ----------------------------------------------------------------------

export default function Register() {
  const theme = useTheme();
  return (
    <>
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
        <Typography variant="body2" sx={{ color: "white" }}>Register with</Typography>
        <AuthSocial />
        {/* Form */}
        <RegisterForm />
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "20px !important",
          }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/auth/login"
            underline="hover"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
