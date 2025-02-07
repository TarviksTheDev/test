import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Alert, IconButton, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import FormProvider, { RHFTextField } from "../../Components/Hook-Form";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("Name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    userName: "",
    email: "demo@test.com",
    password: "demo1234",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      // submit data to backend
      dispatch(RegisterUser(data) as any);
    } catch (error: any) {
      console.error(error);
      reset();
      setError("afterSubmit" as any, {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        mb={4}
        sx={{
          width: "100%",
          maxWidth: "400px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Error Alert */}
        {!!(errors as any).afterSubmit && (
          <Alert severity="error">{(errors as any).afterSubmit.message}</Alert>
        )}

        {/* User Name Field */}
        <Stack spacing={1} alignItems="flex-start">
          <Typography variant="body2" sx={{ fontWeight: 400, color: "text.disabled", textAlign: "left" }}>
            Name
          </Typography>
          <RHFTextField name="userName" label="Enter your user name" />
        </Stack>

        {/* Email Field */}
        <Stack spacing={1} alignItems="flex-start">
          <Typography variant="body2" sx={{ fontWeight: 400,color: "text.disabled", textAlign: "left" }}>
            Email
          </Typography>
          <RHFTextField name="email" label="Enter your email address" />
        </Stack>

        {/* Password Field */}
        <Stack spacing={1} alignItems="flex-start">
          <Typography variant="body2" sx={{ fontWeight: 400, color: "text.disabled", textAlign: "left" }}>
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
        Sign Up
      </LoadingButton>
    </FormProvider>
  );
}
