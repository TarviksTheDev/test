import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { Nav_Buttons } from "../../Data";
import { useSelector } from "react-redux";
import { UpdateTab } from "../../redux/slices/app";
import { dispatch } from "../../redux/store";
import { LogoutUser } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../Assets/icons/Asic Genesis-06.png"

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { tab } = useSelector((state: any) => state.app);
  const selectedTab = tab.tab ?? 0;
  const handleChangeTab = (index: any) => {
    dispatch(UpdateTab({ tab: index } as any) as any);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedTab = Nav_Buttons.find(
      (item) => item.path === currentPath.split("/")[1]
    );
    if (matchedTab) {
      handleChangeTab(matchedTab.index);
    }
  }, [location.pathname]);

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? 240 : 220,
        margin: 2,
        marginTop: 0.8,
        borderRadius: 2,
        backgroundImage:
          "linear-gradient(165deg, rgba(0,21,21,1) 0%, rgba(7,34,33,1) 47%)",
        color: "#fff",
        // height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 2,
      }}
    >
      <Box>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <img
            height={55}
            width={55}
            src={logo}
          />
          <Typography variant="h5" align="center" gutterBottom>
           Asic Genesis
          </Typography>
        </Stack>
        <Divider sx={{ margin: 1 }} />
        <List sx={{ padding: 2, paddingTop: 1 }}>
          {Nav_Buttons.map((item) => {
            return item.index === selectedTab ? (
              <ListItem
                button
                key={item.text}
                sx={{
                  bgcolor: "#0AB7A626",
                  borderRadius: 1,
                }}
                onClick={() => {
                  handleChangeTab(item.index);
                  navigate(`${item.path}`);
                }}
              >
                <IconButton
                  size="medium"
                  sx={{
                    borderRadius: "3px",
                    width: "35px",
                    height: "35px",
                    color: "#0AB7A626",
                    backgroundColor: "#0AB7A626",
                    marginRight: 1,
                  }}
                >
                  {item.icon}
                </IconButton>
                <ListItemText primary={item.text} />
              </ListItem>
            ) : (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  handleChangeTab(item.index);
                  navigate(`${item.path}`);
                }}
              >
                <IconButton
                  size="medium"
                  sx={{
                    borderRadius: "3px",
                    width: "35px",
                    height: "35px",
                    color: "#0AB7A626",
                    backgroundColor: "#0AB7A626",
                    marginRight: 1,
                  }}
                >
                  {item.icon}
                </IconButton>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <List sx={{ padding: "0px 14px" }}>
        <ListItem
          button
          onClick={() => {
            dispatch(LogoutUser() as any);
          }}
        >
          <IconButton
            size="medium"
            sx={{
              borderRadius: "3px",
              width: "35px",
              height: "35px",
              color: "#0AB7A626",
              backgroundColor: "#0AB7A626",
              marginRight: 1,
            }}
          >
            <Logout sx={{color:"#0AB7A6"}} />
          </IconButton>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "absolute", top: 16, left: 16, zIndex: 1300 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              zIndex: 1300,
              "& .MuiDrawer-paper": {
                backgroundImage:
                  "linear-gradient(165deg, rgba(0,21,21,1) 0%, rgba(7,34,33,1) 47%)",
                color: "#fff",
                margin:0
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
    </>
  );
}

export default Sidebar;
