import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import FormProvider, { RHFTextField } from "../../Components/Hook-Form";
import { Eye, EyeSlash } from "phosphor-react";
import { LoginUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  }: any = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      // submit data to backend
      dispatch(LoginUser(data) as any);
    } catch (error: any) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        mb={5}
        sx={{
          width: "100%",
          maxWidth: "400px",
          mx: "auto",
          px: { xs: 2, sm: 4 }, // Padding for small screens
        }}
      >
        {/* Error Alert */}
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        {/* Email Field */}
        <Stack spacing={1}>
          <Typography
            sx={{ fontWeight: 200, color: "#fefefe", textAlign: "left",fontSize:13 }}
          >
            Email Address
          </Typography>
          <RHFTextField name="email" label="Enter your email" />
        </Stack>

        {/* Password Field */}
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 200, color: "#fefefe", textAlign: "left",fontSize:13 }}
          >
            Password
          </Typography>
          <RHFTextField
            name="password"
            label="Enter your password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      {/* Submit Button */}
      <LoadingButton
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
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
