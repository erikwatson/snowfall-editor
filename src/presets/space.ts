import { DEFAULT_IMAGE_LAYER, DEFAULT_SIMPLE_LAYER, Types } from "@erikwatson/snowfall";
import { Preset } from "./presets";

export const SpaceUserConfig: Types.CompleteUserConfig = {
  "layers": [
    {
      ...DEFAULT_SIMPLE_LAYER,
      "colour": "#f4d7d7",
      "density": 100,
      mode: 'simple',
      "mass": {
        "min": 0,
        "max": 2
      },
      "sway": {
        "frequency": 0,
        "amplitude": 0
      },
      "gravity": {
        "angle": 90,
        "strength": 0
      },
      "wind": {
        "angle": 0,
        "strength": 1,
        "gusts": {
          "active": false,
          "changeChance": 0,
          "in": {
            "additionalStrength": {
              "min": 1,
              "max": 3
            },
            "duration": {
              "min": 1000,
              "max": 3000
            },
            "delay": {
              "min": 1000,
              "max": 10000
            }
          },
          "out": {
            "duration": {
              "min": 1000,
              "max": 10000
            },
            "delay": {
              "min": 5000,
              "max": 10000
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      "colour": "#ffffff",
      "density": 200,
      mode: 'simple',
      "mass": {
        "min": 0,
        "max": 2
      },
      "sway": {
        "frequency": 0,
        "amplitude": 0
      },
      "gravity": {
        "angle": 90,
        "strength": 0
      },
      "wind": {
        "angle": 0,
        "strength": 1,
        "gusts": {
          "active": false,
          "changeChance": 0,
          "in": {
            "additionalStrength": {
              "min": 1,
              "max": 3
            },
            "duration": {
              "min": 1000,
              "max": 3000
            },
            "delay": {
              "min": 1000,
              "max": 10000
            }
          },
          "out": {
            "duration": {
              "min": 1000,
              "max": 10000
            },
            "delay": {
              "min": 5000,
              "max": 10000
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      "colour": "#d7e0f4",
      "density": 100,
      mode: 'simple',
      "mass": {
        "min": 0,
        "max": 2
      },
      "sway": {
        "frequency": 0,
        "amplitude": 0
      },
      "gravity": {
        "angle": 90,
        "strength": 0
      },
      "wind": {
        "angle": 0,
        "strength": 1,
        "gusts": {
          "active": false,
          "changeChance": 0,
          "in": {
            "additionalStrength": {
              "min": 1,
              "max": 3
            },
            "duration": {
              "min": 1000,
              "max": 3000
            },
            "delay": {
              "min": 1000,
              "max": 10000
            }
          },
          "out": {
            "duration": {
              "min": 1000,
              "max": 10000
            },
            "delay": {
              "min": 5000,
              "max": 10000
            }
          }
        }
      }
    },
    {
      ...DEFAULT_IMAGE_LAYER,
      "density": 2,
      rotate: false,
      mode: 'image',
      image: "data:image/png;base64,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", 

      "mass": {
        "min": 3,
        "max": 6
      },
      "sway": {
        "frequency": 0,
        "amplitude": 0
      },
      "gravity": {
        "angle": 90,
        "strength": 0
      },
      "wind": {
        "angle": 0,
        "strength": 1,
        "gusts": {
          "active": false,
          "changeChance": 0,
          "in": {
            "additionalStrength": {
              "min": 1,
              "max": 3
            },
            "duration": {
              "min": 1000,
              "max": 3000
            },
            "delay": {
              "min": 1000,
              "max": 10000
            }
          },
          "out": {
            "duration": {
              "min": 1000,
              "max": 10000
            },
            "delay": {
              "min": 5000,
              "max": 10000
            }
          }
        }
      }
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      "colour": "#ffffff",
      "density": 50,
      mode: 'simple',
      "mass": {
        "min": 2,
        "max": 4
      },
      "sway": {
        "frequency": 0,
        "amplitude": 0
      },
      "gravity": {
        "angle": 90,
        "strength": 0
      },
      "wind": {
        "angle": 0,
        "strength": 2,
        "gusts": {
          "active": false,
          "changeChance": 0,
          "in": {
            "additionalStrength": {
              "min": 1,
              "max": 3
            },
            "duration": {
              "min": 1000,
              "max": 3000
            },
            "delay": {
              "min": 1000,
              "max": 10000
            }
          },
          "out": {
            "duration": {
              "min": 1000,
              "max": 10000
            },
            "delay": {
              "min": 5000,
              "max": 10000
            }
          }
        }
      }
    },
    
  ],

  "attachTo": "snowfall"
};

export const PRESET_SPACE: Preset = {
  name: "Space",
  userConfig: SpaceUserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#0d0014",
    schedule: undefined,
    preset: 'space'
  }
}