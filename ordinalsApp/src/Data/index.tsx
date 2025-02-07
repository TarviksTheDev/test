import {
  AccountBalanceWallet,
  Dashboard,
  Logout,
  Settings,
  History,
} from "@mui/icons-material";

const Profile_Menu = [
  {
    index: 0,
    text: "Sign Out",
    title: "Sign Out",
    icon: <Logout />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <Dashboard sx={{color:"#0AB7A6"}}/>,
    text: "Dashboard",
    path: 'dashboard'
  },
  {
    index: 1,
    icon: <AccountBalanceWallet sx={{color:"#0AB7A6"}}/>,
    text: "Stake Ordinals",
    path: 'stakeOrdinals'
  },
  {
    index: 2,
    icon: <AccountBalanceWallet sx={{color:"#0AB7A6"}}/>,
    text: "Reward",
    path: 'rewards'
  },
  {
    index: 3,
    icon: <History sx={{color:"#0AB7A6"}}/>,
    text: "History",
    path: 'history'
  },
  {
    index: 4,
    icon: <Settings sx={{color:"#0AB7A6"}}/>,
    text: "Settings",
    path: 'settings'
  },
];

export { Profile_Menu, Nav_Buttons };
