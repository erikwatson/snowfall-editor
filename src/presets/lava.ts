import { DEFAULT_SIMPLE_LAYER, Types } from "@erikwatson/snowfall";
import { Preset } from "./presets";

const LavaUserConfig: Types.CompleteUserConfig = {
  attachTo: "snowfall",
  layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#b5b7b2",
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