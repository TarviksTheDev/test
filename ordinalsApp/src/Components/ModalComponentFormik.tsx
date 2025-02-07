import React, { ReactNode, RefObject } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  isEmptyChildren,
  isFunction,
} from "formik";
import * as Yup from "yup";
import { X } from "phosphor-react";

interface ModelFormikProps<T> {
  open: boolean;
  isFooterBtn:boolean;
  isSubModal:boolean;
  title: string;
  onClose: () => void;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  innerRef?: RefObject<FormikProps<T>>;
  validateOnChange: boolean;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  children?: (props: FormikProps<T>) => ReactNode | any;
  validateOnBlur?: boolean;
}

const IconButton = styled(Button)({
  "&:hover": {
    color: "red",
    fontWeight: 500,
  },
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  padding: 0,
  minWidth: 30,
});

const style = {
  position: "absolute" as `absolute`,
  top: "40%",
  left: "50%",
  right: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  //border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  padding: "0px !important",
};

const ModelFormikComponent = <T extends object>(
  props: React.PropsWithChildren<ModelFormikProps<T>> | any
) => {
  const {
    open,
    onClose,
    isFooterBtn=true,
    isSubModal=false,
    initialValues,
    validationSchema,
    onSubmit,
    innerRef,
    children,
    title,
    validateOnChange,
    validateOnBlur
  } = props;

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={false}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<T>) => (
        <>
          <Modal
            open={open}
            onClose={onClose}
            sx={{
              paddingTop: 2,
            }}
          >
            <Box sx={style} style={{width:isSubModal && 600}}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                sx={{
                  padding: "0px 0px 4px 8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    p: 0.5,
                  }}
                >
                  {title}
                </Typography>
                <IconButton
                  startIcon={<X size={20} />}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={onClose}
                />
              </Stack>
              <Divider />
              <Stack sx={{padding: "18px 20px " }}>
                {children
                  ? isFunction(children)
                    ? (children as (bag: FormikProps<T>) => React.ReactNode)(
                        formikProps as FormikProps<T>
                      )
                    : !isEmptyChildren(children)
                    ? React.Children.only(props.children)
                    : null
                  : null}
              </Stack>

              <Divider />
              <Stack
                direction={"row"}
                justifyContent={"end"}
                sx={{
                  padding: "18px",
                }}
                gap={1}
              >
                {isFooterBtn && (
                  <>
                <Button
                  onClick={onClose}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    height: 30,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={formikProps.submitForm}
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  sx={{
                    height: 30,
                  }}
                >
                  Submit
                </Button>
                </>
                )}
              </Stack>
            </Box>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default ModelFormikComponent;