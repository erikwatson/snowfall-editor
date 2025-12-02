import { DEFAULT_IMAGE_LAYER, DEFAULT_SWAY, DEFAULT_WIND, DEFAULT_WIND_GUSTS, Types } from "@erikwatson/snowfall";
import { Preset } from "./presets";

// Bubbles 
const FalloutUserConfig: Types.CompleteUserConfig = {
  layers: [
    { 
      ...DEFAULT_IMAGE_LAYER,
      image: './assets/bubbles.png',
      density: 15,
      wind: {
        ...DEFAULT_WIND,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          active: false
        }
      },
      gravity: {
        angle: 270,
        strength: 1
      },

      sway: {
        amplitude: 1,
        frequency: 1
      }
    }
  ],
  attachTo: "snowfall"
}

DEFAULT_SWAY.frequency

export const PRESET_FALLOUT: Preset = {
  name: "Fallout",
  userConfig: FalloutUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#192419",
    schedule: undefined,
    preset: 'fallout'
  }
};