import { CompleteUserConfig, DEFAULT_OPACITY } from "@erikwatson/snowfall";
import { Preset } from "./presets";
import { DEFAULT_GRAVITY, DEFAULT_SIMPLE_LAYER, DEFAULT_USER_CONFIG, DEFAULT_WIND, DEFAULT_WIND_GUSTS } from "@erikwatson/snowfall";

const RainUserConfig: CompleteUserConfig = {
  ...DEFAULT_USER_CONFIG,
   layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      trail: true,
      density: 450,
      mass: {
        min: 5,
        max: 8
      },
      opacity: {
        ...DEFAULT_OPACITY,
        min: 0.56
      },
      gravity: {
        ...DEFAULT_GRAVITY,
        strength: 2.5
      },
      sway: {
        frequency: 0,
        amplitude: 0,
      },
      wind: {
        ...DEFAULT_WIND,
        strength: 1,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          active: false,
        }
      }
    },
  ]
}

export const PRESET_RAIN: Preset = {
  name: "Rain",
  userConfig: RainUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#818792",
    schedule: undefined,
    preset: 'classic'
  }
};

