import { Stack, Typography, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import AuthResetPasswordForm from "../../Sections/Auth/ResetPasswordForm";

const ResetPassword = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        spacing={4}
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
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>
        </Stack>

        {/* Reset Password Form */}
        <AuthResetPasswordForm />

        <Link
          component={RouterLink}
          to={"/auth/login"}
          color="inherit"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <CaretLeft size={24} />
          Return to sign in
        </Link>
      </Stack>
    </>
  );
};

export default ResetPassword;
