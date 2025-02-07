import { createSlice } from "@reduxjs/toolkit";

import { showSnackbar } from "./app";
import { requestHandler } from "../../Utils";
import { loginUser, registerUser } from "../../Api";
import { UserInterface } from "../../Interfaces/user";

// ----------------------------------------------------------------------

export interface AuthInitialState {
  isLoggedIn: boolean;
  token: string;
  isLoading: boolean;
  user: UserInterface | null;
  error: boolean;
}

const initialState: AuthInitialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    registerUserDetail(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut(state?: any) {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(formValues: any) {
  return async (dispatch: any) => {
    // Make API call here
    await requestHandler(
      async () => await loginUser(formValues),
      () => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: true, error: false })
        );
      },
      (res) => {
        if (res.success) {
          const { data } = res;
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: data.accessToken,
              user: data.user,
            })
          );
          dispatch(
            showSnackbar({ severity: "success", message: res.data.message })
          );
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        } else {
          dispatch(showSnackbar({ severity: "error", message: res.message }));
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        }
      },
      (error: any) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(showSnackbar({ severity: "error", message: error }));
      } // Display error alerts on request failure
    );
  };
}

export function RegisterUser(formValues: any) {
  return async (dispatch: any) => {
    // Make API call here
    await requestHandler(
      async () => await registerUser(formValues),
      () => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: true, error: false })
        );
      },
      (res) => {
        if (res.success) {
          const { data } = res;
          dispatch(
            slice.actions.registerUserDetail({
              isLoggedIn: true,
              token: data.accessToken,
              user: data.user,
            })
          );
          dispatch(
            showSnackbar({ severity: "success", message: res.data.message })
          );
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        } else {
          dispatch(showSnackbar({ severity: "error", message: res.message }));
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        }
      },
      (error: any) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(showSnackbar({ severity: "error", message: error }));
      } // Display error alerts on request failure
    );
  };
}

export function LogoutUser() {
  return async (dispatch: any) => {
    window.localStorage.removeItem("user");
    dispatch(slice.actions.signOut());
  };
}

export function UpdateUserProfile(userData: any) {
  return async (dispatch: any) => {
    dispatch(
      slice.actions.updateUser({
        user: userData,
      })
    );
  };
}
