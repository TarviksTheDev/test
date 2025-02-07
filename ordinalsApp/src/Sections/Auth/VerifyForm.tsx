import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Button } from "@mui/material";
// components
import FormProvider from "../../Components/Hook-Form";
import RHFCodes from "../../Components/Hook-Form/RHFCodes";
// import { VerifyEmail } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export default function VerifyForm() {
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = methods;

  const onSubmit = async () => {
    try {
      //   Send API Request
      // dispatch(
      //   VerifyEmail({
      //     email,
      //     otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      //   })
      // );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes
        sx={{borderColor:"#fff"}}
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

        <Button
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
          Verify
        </Button>
      </Stack>
    </FormProvider>
  );
}
