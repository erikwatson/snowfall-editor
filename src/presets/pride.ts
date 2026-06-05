import {
  CompleteUserConfig,
  ConfigLayer,
  DEFAULT_IMAGE,
  DEFAULT_IMAGE_LAYER,
} from "@erikwatson/snowfall";
import { Preset } from "./presets";
import {
  DEFAULT_GRAVITY,
  DEFAULT_SIMPLE_LAYER,
  DEFAULT_USER_CONFIG,
  DEFAULT_WIND,
  DEFAULT_WIND_GUSTS,
  DEFAULT_WIND_GUSTS_ACTIVE,
} from "@erikwatson/snowfall";

// const wind = { ...DEFAULT_WIND };

const x: ConfigLayer = {
  ...DEFAULT_IMAGE_LAYER,
  density: 10,
  image: "./assets/red.png",
  size: {
    min: 16,
    max: 32,
  },
  sway: {
    frequency: 0.784,
    amplitude: 0.18,
  },
  gravity: {
    angle: 270,
    strength: 0.3,
  },
  wind: {
    ...DEFAULT_WIND,
    gusts: {
      ...DEFAULT_WIND_GUSTS,
      active: false,
    },
  },
  mode: "image",
};

const PrideUserConfig: CompleteUserConfig = {
  ...DEFAULT_USER_CONFIG,
  layers: [
    { ...x },
    { ...x, image: "./assets/orange.png" },
    { ...x, image: "./assets/yellow.png" },
    { ...x, image: "./assets/cowboy.png", rotate: false, size: { min: 36, max: 56 }, sway: { frequency: 0, amplitude: 0 },  },
    { ...x, image: "./assets/green.png" },
    { ...x, image: "./assets/light-blue.png" },
    { ...x, image: "./assets/purple.png" },
    { ...x, image: "./assets/eggplant.png", rotate: true, gravity: DEFAULT_GRAVITY, size: { min: 36, max: 56 }, sway: { frequency: 0, amplitude: 0 }, },
  ],
};

export const PRESET_PRIDE: Preset = {
  name: "Pride",
  userConfig: PrideUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#db84d4",
    schedule: undefined,
    preset: "pride",
  },
};
