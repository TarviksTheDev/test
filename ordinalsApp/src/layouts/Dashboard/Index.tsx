/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, useTheme,CssBaseline, Box } from "@mui/material";
import { useDispatch, useSelector } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import Profile from "../../pages/Dashboard/Settings/Profile";
import { SideBarType, ToggleSidebar } from "../../redux/slices/app";
import useResponsive from "../../Hooks/useResponsive";
import Header from "./Header";
import SideNav from "./SideNav";
import Sidebar from "./SideNav";
import {WalletProvider} from "../../Contexts/walletContext"

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useResponsive("up", "md");
  const { sideBar } = useSelector((state: any) => state.app);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const theme = useTheme();

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
    <WalletProvider>
      <Box sx={{ display: "flex", height: "100vh", overflow:'scroll' }}>
        <CssBaseline />
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <Outlet/>
        </Box>
      </Box>
      </WalletProvider>
    </>
  );
};

export default DashboardLayout;
