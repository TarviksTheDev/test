// theme
import palette from "../Theme/Palette";

export const colorPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: "blue",
    lighter: "#D1E9FC",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
  // Purple
  {
    name: "purple2",
    lighter: "#e2d4e0",
    light: "#a97fa1",
    main: "#702963",
    dark: "#8d5482",
    darker: "#702963",
    contrastText: "#fff",
  },
  //green
  {
    name: "green",
    lighter: "#f4fff0",
    light: "#c2ffb8",
    main: "#9cff8f",
    dark: "#6ff662",
    darker: "#4fcf48",
    contrastText: "#fff",
  },
  //brown
  {
    name: "brown",
    lighter: "#ffd8bf",
    light: "#ff9c6e",
    main: "#ff7a45",
    dark: "#fa541c",
    darker: "#d4380d",
    contrastText: "#fff",
  },
  //Custom
  {
    name: "admin",
    lighter: "#ffd8bf",
    light: "#414345",
    main: "#232526",
    dark: "#fa541c",
    darker: "#d4380d",
    contrastText: "#fff",
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];
export const purplePreset2 = colorPresets[6];
export const green = colorPresets[7];
export const brown = colorPresets[8];
export const admin = colorPresets[9];

type PresetType = {
  [key: string]: any; // You can replace 'any' with specific types if you have them
};

export default function getColorPresets(presetsKey: string): PresetType | undefined {
  const presets: PresetType = {
    purple: purplePreset,
    purple2: purplePreset2,
    brown: brown,
    green: green,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    admin: admin,
    default: defaultPreset,
  };

  return presets[presetsKey];
}
