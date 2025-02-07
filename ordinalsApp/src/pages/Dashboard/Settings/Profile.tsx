import React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import ProfileForm from "../../../Sections/dashboard/Settings/ProfileForm";
import { CaretLeft} from "phosphor-react";
import useResponsive from "../../../Hooks/useResponsive";

interface ProfileMenu {
  openDrawer: boolean;
  setOpenDrawer: any;
}

const Profile = ({ openDrawer, setOpenDrawer }: ProfileMenu) => {
  const isDesktop = useResponsive("up", "md");
  const theme = useTheme();

  return (
    <Box
      sx={
        {
          height: "100%",
          boxShadow: theme.palette.mode === "light" ? "0px 0px 1px rgba(0, 0, 0, 0.5)" : "0px 0px 1px",
          overflowX: "hidden",
          overflowY: "auto",
          width: openDrawer ? (isDesktop ? '100%' : "100vw") : "0px",
          borderTopRightRadius: "6px",
          borderBottomRightRadius: "6px",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFF"
              : theme.palette.background.paper,
        } as any
      }
    >
      <Stack
        spacing={1}
        sx={{
          maxHeight: "100vh",
        }}
      >
        <Stack
          p={1.3}
          alignItems={"center"}
          direction="row"
          justifyContent="space-between"
          sx={{ boxShadow:theme.palette.mode === "light" ? "0px 0px 1px rgba(0, 0, 0, 0.5)" : "0px 0px 1px" }}
        >
          <CaretLeft
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenDrawer(false)}
          />
          {/* <Gear size={20} /> */}
        </Stack>
        <Stack sx={{ height: "100%" }}>
          <ProfileForm />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;
