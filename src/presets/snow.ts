import { CompleteUserConfig } from "@erikwatson/snowfall/dist/types";
import { Preset } from "./presets";
import { DEFAULT_SIMPLE_LAYER } from "@erikwatson/snowfall";

const SnowUserConfig: CompleteUserConfig = {
  attachTo: "snowfall",
  layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#8d90b7",
      density: 200,
      mode: 'simple',
      mass: {
        min: 1,
        max: 3
      },
      sway: {
        frequency: 0.02,
        amplitude: 1
      },
      gravity: {
        angle: 90,
        strength: 0.7
      },
      wind: {
        angle: 0,
        strength: 0,
        gusts: {
          active: true,
          changeChance: 0.25,
          in: {
            additionalStrength: {
              min: 1,
              max: 3
            },
            duration: {
              min: 1000,
              max: 3000
            },
            delay: {
              min: 1000,
              max: 10000
            }
          },
          out: {
            duration: {
              min: 1000,
              max: 10000
            },
            delay: {
              min: 5000,
              max: 10000
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#ffffff",
      density: 200,
      mode: 'simple',
      mass: {
        min: 1,
        max: 3
      },
      sway: {
        frequency: 0.02,
        amplitude: 1
      },
      gravity: {
        angle: 90,
        strength: 0.7
      },
      wind: {
        angle: 0,
        strength: 0,
        gusts: {
          active: true,
          changeChance: 0.25,
          in: {
            additionalStrength: {
              min: 1,
              max: 3
            },
            duration: {
              min: 1000,
              max: 3000
            },
            delay: {
              min: 1000,
              max: 10000
            }
          },
          out: {
            duration: {
              min: 1000,
              max: 10000
            },
            delay: {
              min: 5000,
              max: 10000
            }
          }
        }
      }
    }
  ],
}

export const PRESET_SNOW: Preset = {
  name: "Snow",
  userConfig: SnowUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#0d0014",
    schedule: undefined,
    preset: 'snow'
  }
};