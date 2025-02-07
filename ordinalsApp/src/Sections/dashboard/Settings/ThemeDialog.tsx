import React from "react";
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SettingColorPresets from "../../../Components/Settings/Drawer/SettingColorPresets";
import useSettings from "../../../Hooks/useSettings";
import { Desktop, Moon, Sun } from "phosphor-react";
import Box from "@mui/material/Box";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...(props as any)} />;
// });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ThemeDialog = () => {
  const { onToggleMode } = useSettings();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="light"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="light"
            control={<Radio onChange={onToggleMode} />}
            label="Light"
          />
          <FormControlLabel
            value="dark"
            control={<Radio onChange={onToggleMode} />}
            label="Dark"
          />
          <FormControlLabel
            value="system"
            control={<Radio />}
            label="System Default"
          />
        </RadioGroup>
      </FormControl> */}
      {/* <Divider sx={{ borderStyle: "dashed" }} /> */}
      {/* <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Presets</Typography>
          <SettingColorPresets />
        </Stack>
        <SettingFullscreen />
      </Stack> */}
      {/* <Stack sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>
          Apply
        </Button>
      </Stack> */}
      <Stack sx={{ paddingLeft: 0 }} alignItems={"start"}>
        <span style={{ fontWeight: 10 }}>Color Mode</span>
        <span style={{ marginTop: "10px" }}>
          Choose if Slack’s appearance should be light or dark, or follow your
          computer’s settings
        </span>
        <Stack direction={"row"} sx={{ marginTop: 2 }}>
          <Button
            startIcon={<Moon size={22} />}
            onClick={onToggleMode}
            variant="outlined"
          >
            Dark
          </Button>
          <Button
            startIcon={<Sun size={22} />}
            onClick={onToggleMode}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            Light
          </Button>
          <Button
            startIcon={<Desktop size={22} />}
            onClick={onToggleMode}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            System
          </Button>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Slack themes" {...a11yProps(0)} />
              <Tab label="Custom themes" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <p>Single color</p>
            <Stack spacing={3} sx={{ p: 1 }}>
              <Stack >
                <SettingColorPresets />
              </Stack>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <p>Theme colors</p>
          </CustomTabPanel>
        </Stack>
      </Stack>
    </>
  );
};

export default ThemeDialog;
