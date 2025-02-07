import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
// components
import FormProvider, { RHFTextField } from '../../Components/Hook-Form';
import { Eye, EyeSlash } from 'phosphor-react';
// import { NewPassword } from '../../redux/slices/auth';

// ----------------------------------------------------------------------

export default function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    passwordConfirm: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async () => {
    try {
    //   Send API Request
    // dispatch(NewPassword({...data, token: queryParameters.get('token')}));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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

        <RHFTextField
          name="passwordConfirm"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
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
          Update Password
        </Button>
      </Stack>
    </FormProvider>
  );
}