import React, { ReactNode, useRef } from "react";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AuthInitialState } from "../../../redux/slices/auth";
import { CheckCircle, Pen } from "phosphor-react";
import { UpdateUserProfile } from "../../../redux/slices/auth";
import { Formik, FormikProps } from "formik";
import { UserInterface } from "../../../Interfaces/user";
import { requestHandler } from "../../../Utils";
import { updateUser } from "../../../Api";
import { dispatch } from "../../../redux/store";
import { showSnackbar } from "../../../redux/slices/app";

const ProfileForm = () => {
  const profileRef = useRef<FormikProps<UserInterface>>();
  const inputRef = useRef<any>();
  const { user } = useSelector((state: any) => state.auth as AuthInitialState);
  const [disable, setDisable] = React.useState(true);

  React.useEffect(() => {
    const setUser = async () => {
      const val: UserInterface = {
        _id: user?._id,
        about: user?.about ??"",
        displayName: user?.displayName ?? "",
        email: user?.email,
        pic: user?.pic,
        phone: user?.phone ?? "",
        title: user?.title ?? "",
        userName: user?.userName ?? "",
        isEmailVerified: user?.isEmailVerified,
      } as any;
      profileRef.current?.setValues(val);
    };
    setUser();
  }, [user]);

  const profileSchema = Yup.object({
    username: Yup.string().required("Required Username"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string().required("Required PhoneNumber").min(10).nullable(),
  });

  return (
    <>
      <Formik
        innerRef={profileRef as any}
        initialValues={user as any}
        validationSchema={profileSchema}
        validateOnMount={false}
        onSubmit={async (values: UserInterface) => {
          const userData: any = {
            ...values,
            _id: user?._id,
          };
          await requestHandler(
            async () => await updateUser(userData),
            null,
            (res: any) => {
              res.value;
              dispatch(UpdateUserProfile(userData) as any);
              dispatch(
                showSnackbar({
                  severity: "success",
                  message: "Profile updated successfully",
                }) as any
              );
            },
            // If there's an error during the profile update process, raise an alert
            (error: string) => {
              dispatch(
                showSnackbar({ severity: "error", message: error }) as any
              );
            }
          );
        }}
      >
        {({
          values,
          setValues,
          handleSubmit,
          handleReset,
        }: FormikProps<UserInterface>): ReactNode => {
          return (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <Stack
                spacing={3}
                direction={"column"}
                justifyContent={"space-between"}
                sx={{ padding: 2, height: "100%" }}
              >
                {/* For profile picture upload  */}
                <Stack sx={{ alignItems: "center" }}>
                  <Stack
                    spacing={4}
                    sx={{
                      position: "relative",
                      width: 120,
                      height: 120,
                      marginLeft: "0px",
                      borderRadius: 50,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 50,
                      }}
                      src={values?.pic}
                    />
                    {!disable && (
                      <Stack
                        sx={{
                          position: "absolute",
                          bottom: -2,
                          right: 5,
                          width: 25,
                          height: 25,
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 50,
                          backgroundColor: "#e2e2e2",
                          zIndex: 1,
                        }}
                      >
                        <Pen
                          size={20}
                          onClick={() => {
                            inputRef.current.click();
                          }}
                        />
                      </Stack>
                    )}
                    <input
                      disabled={disable}
                      ref={inputRef}
                      hidden
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        if (e.target.files) {
                          const files = e.target.files[0];
                          setValues((v) => ({
                            ...v,
                            uploadPic: files,
                          }));
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setValues((v) => ({
                              ...v,
                              pic: event.target?.result as any,
                            }));
                          };
                          reader.readAsDataURL(files);
                        }
                        e.target.value = "";
                      }}
                    />
                  </Stack>
                </Stack>
                <Stack spacing={disable ? 2 : 4} sx={{ alignItems: "center" }}>
                  {/* user Name */}
                  <TextField
                    disabled={disable}
                    label="User Name"
                    variant="outlined"
                    name="username"
                    size="small"
                    sx={{ width: "100%" }}
                    defaultValue={values?.userName}
                    onChange={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        userName: e.currentTarget?.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        userName: e.currentTarget?.value
                          ? e.currentTarget?.value.trim()
                          : "",
                      }));
                    }}
                  />
                  {/* user Email */}
                  <TextField
                    disabled={disable}
                    label="Email"
                    variant="outlined"
                    name="email"
                    size="small"
                    sx={{ width: "100%" }}
                    defaultValue={values?.email}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckCircle
                            size={20}
                            color={values.isEmailVerified ? "Green" : "gray"}
                          />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        email: e.currentTarget?.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        email: e.currentTarget?.value
                          ? e.currentTarget?.value.trim()
                          : "",
                      }));
                    }}
                  />
                  {/* user Display Name */}
                  <TextField
                    disabled={disable}
                    label="Display Name"
                    placeholder="Enter display name"
                    variant="outlined"
                    name="displayName"
                    size="small"
                    sx={{ width: "100%" }}
                    defaultValue={values?.displayName ?? ""}
                    onChange={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        displayName: e.currentTarget?.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        displayName: e.currentTarget?.value
                          ? e.currentTarget?.value.trim()
                          : "",
                      }));
                    }}
                  />
                  {/* user Phone */}
                  <TextField
                    disabled={disable}
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    size="small"
                    sx={{ width: "100%" }}
                    defaultValue={values?.phone}
                    onChange={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        phone: e.currentTarget?.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        phone: e.currentTarget?.value
                          ? e.currentTarget?.value.trim()
                          : "",
                      }));
                    }}
                  />
                  {/* About */}
                  <TextField
                    rows={4}
                    multiline
                    disabled={disable}
                    label="About"
                    variant="outlined"
                    name="about"
                    size="small"
                    sx={{ width: "100%" }}
                    defaultValue={values?.about}
                    onChange={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        about: e.currentTarget?.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setValues((v: UserInterface) => ({
                        ...v,
                        about: e.currentTarget?.value
                          ? e.currentTarget?.value.trim()
                          : "",
                      }));
                    }}
                  />
                </Stack>
                {/* Footer buttons */}
                <Stack
                  // direction={"col"}
                  gap={2}
                >
                  <Button
                    disabled={disable}
                    onClick={() => {
                      setDisable(true);
                    }}
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
                    type="button"
                    onClick={async (e) => {
                      if (!disable) {
                        e.preventDefault();
                        const userData: any = {
                          ...values,
                          _id: user?._id,
                        };
                        await requestHandler(
                          async () => await updateUser(userData),
                          null,
                          (res: any) => {
                            res.value;
                            dispatch(UpdateUserProfile(userData) as any);
                            dispatch(
                              showSnackbar({
                                severity: "success",
                                message: "Profile updated successfully",
                              }) as any
                            );
                          },
                          // If there's an error during the profile update process, raise an alert
                          (error: string) => {
                            dispatch(
                              showSnackbar({
                                severity: "error",
                                message: error,
                              }) as any
                            );
                          }
                        );
                      }
                      setDisable(!disable);
                    }}
                    color="secondary"
                    sx={{
                      height: 30,
                    }}
                  >
                    {disable ? "Edit" : "Save"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProfileForm;
