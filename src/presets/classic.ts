import { CompleteUserConfig } from "@erikwatson/snowfall";
import { Preset } from "./presets";
import { DEFAULT_GRAVITY, DEFAULT_SIMPLE_LAYER, DEFAULT_USER_CONFIG, DEFAULT_WIND, DEFAULT_WIND_GUSTS, DEFAULT_WIND_GUSTS_ACTIVE } from "@erikwatson/snowfall";

// const wind = { ...DEFAULT_WIND };

const ClassicUserConfig: CompleteUserConfig = {
  ...DEFAULT_USER_CONFIG,
   layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      opacity: { min: 100, max: 100 },
      density: 50,
      size: {
        min: 3,
        max: 9
      },
      gravity: {
        ...DEFAULT_GRAVITY,
        strength: 1.5
      },
      wind: {
        ...DEFAULT_WIND,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          active: false,
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      opacity: { min: 100, max: 100 },
      density: 50,
      colour: '#8d90b7',
      size: {
        min: 3,
        max: 9
      },
      gravity: {
        ...DEFAULT_GRAVITY,
        strength: 1.5
      },
      wind: {
        ...DEFAULT_WIND,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          active: false,
        }
      }
    },
  ]
}

export const PRESET_CLASSIC: Preset = {
  name: "Classic",
  userConfig: ClassicUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#0d0014",
    schedule: undefined,
    preset: 'snow'
  }
};