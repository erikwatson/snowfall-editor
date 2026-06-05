import { DEFAULT_GRAVITY, DEFAULT_LAYERS, DEFAULT_SIMPLE_LAYER, DEFAULT_WIND, DEFAULT_WIND_GUSTS, DEFAULT_WIND_GUSTS_IN, DEFAULT_WIND_IN_ADDITIONAL_STRENGTH, Types } from "@erikwatson/snowfall";
import { Preset } from "./presets";

const LavaUserConfig: Types.CompleteUserConfig = {
  attachTo: "snowfall",
  layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#170707",
      opacity: {
        min: 0.133,
        max: 0.966
      },
      density: 300,
      mass: {
        min: 0.1,
        max: 0.2
      },
      size: {
        min: 50,
        max: 100
      },
      gravity: {
        angle: 270,
        strength: 5
      },
      wind: {
        ...DEFAULT_WIND,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          in: {
            ...DEFAULT_WIND_GUSTS_IN,
            additionalStrength: {
              min: 10,
              max: 20
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#280a04",
      opacity: {
        min: 0.133,
        max: 0.966
      },
      density: 25,
      mass: {
        min: 0.1,
        max: 0.2
      },
      size: {
        min: 20,
        max: 50
      },
      gravity: {
        angle: 270,
        strength: 5
      },
      wind: {
        ...DEFAULT_WIND,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          in: {
            ...DEFAULT_WIND_GUSTS_IN,
            additionalStrength: {
              min: 10,
              max: 20
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#efd73b",
      density: 65,
      mode: 'simple',
      mass: {
        min: 1,
        max: 3,
      },
      sway: {
        frequency: 0.02,
        amplitude: 1,
      },
      gravity: {
        angle: 270,
        strength: 1,
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
              max: 3,
            },
            duration: {
              min: 1000,
              max: 3000,
            },
            delay: {
              min: 1000,
              max: 10000,
            },
          },
          out: {
            duration: {
              min: 1000,
              max: 10000,
            },
            delay: {
              min: 5000,
              max: 10000,
            },
          },
        },
      },
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#ef101d",
      density: 65,
      mode: 'simple',
      mass: {
        min: 1,
        max: 3,
      },
      sway: {
        frequency: 0.02,
        amplitude: 1,
      },
      gravity: {
        angle: 270,
        strength: 1,
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
              max: 3,
            },
            duration: {
              min: 1000,
              max: 3000,
            },
            delay: {
              min: 1000,
              max: 10000,
            },
          },
          out: {
            duration: {
              min: 1000,
              max: 10000,
            },
            delay: {
              min: 5000,
              max: 10000,
            },
          },
        },
      },
    },
  ],
};

export const PRESET_LAVA: Preset = {
  name: "Lava",
  userConfig: LavaUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#280a04",
    schedule: undefined,
    preset: 'lava'
  }
}