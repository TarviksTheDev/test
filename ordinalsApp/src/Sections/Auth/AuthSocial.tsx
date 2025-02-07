import { Divider, IconButton, Stack, useTheme } from "@mui/material";
import facebook from "../../Assets/icons/facebookLogo.svg";
import appleLogo from "../../Assets/icons/apple.svg";
import google from "../../Assets/icons/google.svg";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const theme = useTheme();

  const handleGoogleLogin = async () => {};
  const handleGithubLogin = async () => {};
  const handleFacebookLogin = async () => {};

  return (
    <div>
      <Stack direction="row" justifyContent="center" spacing={2}>
        {/* Facebook Button */}
        <IconButton
          onClick={handleFacebookLogin}
          size="medium"
          sx={{
            borderRadius: "4px",
            width: "40px",
            height: "40px",
            color: "#fff",
            boxShadow: theme.shadows[2],
            backgroundColor: "transparent",
          }}
        >
          <img
            src={facebook}
            alt="Facebook"
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>

        {/* Apple Button */}
        <IconButton
          onClick={handleGithubLogin}
          size="medium"
          sx={{
            borderRadius: "4px",
            width: "40px",
            height: "40px",
            color: "#fff",
            boxShadow: theme.shadows[2],
            backgroundColor: "transparent",
          }}
        >
          <img
            src={appleLogo}
            alt="Facebook"
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>

        {/* Google Button */}
        <IconButton
          onClick={handleGoogleLogin}
          size="medium"
          sx={{
            borderRadius: "4px",
            width: "40px",
            height: "40px",
            color: "#fff",
            boxShadow: theme.shadows[2],
            backgroundColor: "transparent",
          }}
        >
          <img
            src={google}
            alt="google"
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>
      </Stack>
      <Divider
        sx={{
          my: 2.2,
          typography: "body2",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "none",
          },
        }}
      >
        Or
      </Divider>
    </div>
  );
}
