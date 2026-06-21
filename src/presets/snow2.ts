import { CompleteUserConfig, DEFAULT_IMAGE } from "@erikwatson/snowfall"
import { Preset } from "./presets"
import {
  DEFAULT_IMAGE_LAYER,
  DEFAULT_SIMPLE_LAYER,
} from "@erikwatson/snowfall"

const Snow2UserConfig: CompleteUserConfig = {
  attachTo: "snowfall",
  layers: [
    {
      ...DEFAULT_SIMPLE_LAYER,
      colour: "#8d90b7",
      density: 150
    },
    {
      ...DEFAULT_IMAGE_LAYER,
      density: 50,
      image: "./assets/snowflake.png",
      rotate: true,
      size: {
        min: 10,
        max: 10,
      },
      mode: "image",
    },
    {
      ...DEFAULT_SIMPLE_LAYER,
      density: 150,
    },
  ],
}

export const PRESET_SNOW2: Preset = {
  name: "Snow2",
  userConfig: Snow2UserConfig,
  editorConfig: {
    advancedSettings: true,
    isMinified: true,
    isReact: false,
    background: "#0d0014",
    schedule: undefined,
    preset: "snow2",
  },
}
