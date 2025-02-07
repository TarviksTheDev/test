import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { Placeholder } from "phosphor-react";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  Placeholder: PropTypes.string,
} as any;

export default function RHFTextField({ name, helperText, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius:1,
            color: "#fff", // For input value text color
            "& .MuiInputBase-input": {
              color: "#fff", // Input value text color
            },
            "& .MuiInputLabel-root": {
              color: "#ffff", // Placeholder text color when unfocused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff", // Placeholder text color when focused
            },
          }}
          {...field}
          fullWidth
          size="small"
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          placeholder={name}
          helperText={error ? error?.message : helperText}
        />
      )}
    />
  );
}
