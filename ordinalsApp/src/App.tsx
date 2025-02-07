// routes
import { Snackbar, Stack } from "@mui/material";
import ThemeSettings from "./Components/Settings";
import Router from "./Routes/Index";
import MuiAlert from "@mui/material/Alert";
// theme
import ThemeProvider from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { closeSnackBar } from "./redux/slices/app";
// components
import "./App.css";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props: any, ref: any) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
  const dispatch = useDispatch();

  const { severity, message, open } = useSelector(
    (state: any) => state.app.snackbar
  );

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
            {" "}
            <Stack
              style={{
                overflow: "hidden",
                maxHeight: "100vh",
                minHeight: "100vh",
              }}
            >
              <Router />{" "}
            </Stack>
        </ThemeSettings>
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal } as any}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            console.log("This is clicked");
            dispatch(closeSnackBar() as any);
          }}
        >
          <Alert
            onClose={() => {
              console.log("This is clicked");
              dispatch(closeSnackBar() as any);
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
