// sections
import { Stack, Typography, useTheme } from "@mui/material";
import VerifyForm from "../../Sections/Auth/VerifyForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
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
          <Typography variant="h4">Please Verify OTP</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">
              Sent to email (rajpurohitvikramdev@gmail.com)
            </Typography>
          </Stack>
        </Stack>
        {/* Form */}
        <VerifyForm />
      </Stack>
    </>
  );
}
