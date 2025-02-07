import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import FormProvider, { RHFTextField } from "../../Components/Hook-Form";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const { isLoading } = useSelector((state: any) => state.auth);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "demo@Scraawl.com" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      //   Send API Request
      //   dispatch(ForgotPassword(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" sx={{marginBottom:5}}/>

      <LoadingButton
        loading={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          backgroundImage: "linear-gradient(to right, #0AB7A6, #086259)",
          color: "white",
          "&:hover": {
            backgroundImage: "linear-gradient(to left, #0AB7A6, #086259)", // Optional hover effect
            color: "white",
          },
        }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
