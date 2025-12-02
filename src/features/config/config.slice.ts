import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_CONTAINER_ID,
  DEFAULT_IMAGE_LAYER,
  DEFAULT_LAYERS,
  DEFAULT_SIMPLE_LAYER,
  DEFAULT_USER_CONFIG,
  Types,
} from "@erikwatson/snowfall";
import { merge2 } from "@erikwatson/snowfall";
import { PRESET_SNOW } from "../../presets/snow";
import { ImageLayerConfig, SimpleLayerConfig } from "@erikwatson/snowfall/dist/types";
import { layerReducer } from "./layer/layer.slice";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { Action } from "@dnd-kit/core/dist/store";

type ConfigLayer = (SimpleLayerConfig | ImageLayerConfig);
type LabeledConfigLayer = ConfigLayer & { label?: string };

export interface EditorCompleteUserConfig extends Omit<Types.CompleteUserConfig, 'layers'> {
  layers: LabeledConfigLayer[];
}

const initialState: EditorCompleteUserConfig = PRESET_SNOW.userConfig;

const configSlice = createSlice({
  name: "userConfig",
  initialState,
  reducers: {
    resetUserConfig: (state) => {
      return DEFAULT_USER_CONFIG;
    },

    setUserConfig: (state, action: PayloadAction<Types.UserConfig>) => {
      return merge2(action.payload);
    },

    // attach to
    resetAttachTo: (state) => {
      state.attachTo = DEFAULT_CONTAINER_ID;
    },

    setAttachTo: (state, action: PayloadAction<string>) => {
      state.attachTo = action.payload;
    },

    // layers
    resetLayers: (state) => {
      state.layers = DEFAULT_LAYERS;
    },

    resetLayer: (state, action: PayloadAction<number>) => {
      state.layers[action.payload] = (state.layers[action.payload].mode === 'simple') 
        ? DEFAULT_SIMPLE_LAYER
        : DEFAULT_IMAGE_LAYER;
    },

    setLayers: (state, action: PayloadAction<ConfigLayer[]>) => {
      state.layers = action.payload;
    },

    setLayer: (
      state,
      action: PayloadAction<{ index: number; layer: LabeledConfigLayer }>
    ) => {
      if (state.layers) {
        state.layers[action.payload.index] = action.payload.layer;
      }
    },

    addLayer: (state, action: PayloadAction<LabeledConfigLayer>) => {
      if (state.layers) {
        state.layers.push(action.payload);
      }
    },

    removeLayer: (state, action: PayloadAction<number>) => {
      if (state.layers) {
        state.layers.splice(action.payload, 1);
      }
    },

    updateLayer: (
      state,
      action: PayloadAction<{ index: number; layer: LabeledConfigLayer }>
    ) => {
      if (state.layers) {
        state.layers[action.payload.index] = action.payload.layer;
      }
    },

    duplicateLayer: (state, action: PayloadAction<number>) => {
      if (state.layers) {
        state.layers.push(state.layers[action.payload]);
      }
    },

    // layer properties (colour, density, size, etc)
    setColour: (
      state,
      action: PayloadAction<{ index: number; colour: string }>
    ) => {
      const layer = state.layers?.[action.payload.index];
      if (layer && layer.mode === 'simple') {
        (layer as SimpleLayerConfig).colour = action.payload.colour;
      }
    },

    setDensity: (
      state,
      action: PayloadAction<{ index?: number; density: number }>
    ) => {
      if (action.payload.index !== undefined) {
        if (state.layers) {
          state.layers[action.payload.index].density = action.payload.density;
        }
      } else {
        state.layers?.forEach((layer) => {
          layer.density = action.payload.density;
        });
      }
    },

    setMass: (
      state,
      action: PayloadAction<{ index: number; mass: Types.SizeBounds }>
    ) => {
      if (state.layers) {
        state.layers[action.payload.index].mass = action.payload.mass;
      }
    },

    setMassMax: (
      state,
      action: PayloadAction<{ index?: number; max: number }>
    ) => {
      if (action.payload.index !== undefined) {
        if (action.payload.max < state.layers[action.payload.index].mass.min) {
          state.layers[action.payload.index].mass.min = action.payload.max;
        }
        state.layers[action.payload.index].mass.max = action.payload.max;
      } else {
        state.layers.forEach((layer) => {
          if (action.payload.max < layer.mass.min) {
            layer.mass.min = action.payload.max;
          }
          layer.mass.max = action.payload.max;
        });
      }
    },

    setMassMin: (
      state,
      action: PayloadAction<{ index?: number; min: number }>
    ) => {
      // we need to set the max mass to the min mass if it's less than the min mass
      if (action.payload.index !== undefined) {
        if (action.payload.min > state.layers[action.payload.index].mass.max) {
          state.layers[action.payload.index].mass.max = action.payload.min;
        }
        state.layers[action.payload.index].mass.min = action.payload.min;
      } else {
        state.layers.forEach((layer) => {
          if (action.payload.min > layer.mass.max) {
            layer.mass.max = action.payload.min;
          }
          layer.mass.min = action.payload.min;
        });
      }
    },

    setSize: (
      state,
      action: PayloadAction<{ index: number; size: Types.SizeBounds }>
    ) => {
      if (state.layers) {
        state.layers[action.payload.index].mass = action.payload.size;
      }
    },

    setSizeMax: (
      state,
      action: PayloadAction<{ index?: number; max: number }>
    ) => {
      if (action.payload.index !== undefined) {
        if (action.payload.max < state.layers[action.payload.index].size.min) {
          state.layers[action.payload.index].size.min = action.payload.max;
        }
        state.layers[action.payload.index].size.max = action.payload.max;
      } else {
        state.layers.forEach((layer) => {
          if (action.payload.max < layer.size.min) {
            layer.size.min = action.payload.max;
          }
          layer.size.max = action.payload.max;
        });
      }
    },

    setSizeMin: (
      state,
      action: PayloadAction<{ index?: number; min: number }>
    ) => {
      // we need to set the max size to the min size if it's less than the min size
      if (action.payload.index !== undefined) {
        if (action.payload.min > state.layers[action.payload.index].size.max) {
          state.layers[action.payload.index].size.max = action.payload.min;
        }
        state.layers[action.payload.index].size.min = action.payload.min;
      } else {
        state.layers.forEach((layer) => {
          if (action.payload.min > layer.size.max) {
            layer.size.max = action.payload.min;
          }
          layer.size.min = action.payload.min;
        });
      }
    },

    setGravity: (
      state,
      action: PayloadAction<{
        index: number;
        gravity: { angle: number; strength: number };
      }>
    ) => {
      state.layers[action.payload.index].gravity = action.payload.gravity;
    },

    setGravityAngle: (
      state,
      action: PayloadAction<{ index: number; angle: number }>
    ) => {
      state.layers[action.payload.index].gravity.angle = action.payload.angle;
    },

    setGravityStrength: (
      state,
      action: PayloadAction<{ index: number; strength: number }>
    ) => {
      state.layers[action.payload.index].gravity.strength =
        action.payload.strength;
    },

    setWind: (
      state,
      action: PayloadAction<{ index: number; wind: Types.Wind }>
    ) => {
      state.layers[action.payload.index].wind = action.payload.wind;
    },

    setWindAngle: (
      state,
      action: PayloadAction<{ index: number; angle: number }>
    ) => {
      state.layers[action.payload.index].wind.angle = action.payload.angle;
    },

    setWindStrength: (
      state,
      action: PayloadAction<{ index?: number; strength: number }>
    ) => {
      if (action.payload.index !== undefined) {
        state.layers[action.payload.index].wind.strength =
          action.payload.strength;
      } else {
        state.layers.forEach((layer) => {
          layer.wind.strength = action.payload.strength;
        });
      }
    },

    setWindGusts: (
      state,
      action: PayloadAction<{ index: number; gusts: Types.Gusts }>
    ) => {
      state.layers[action.payload.index].wind.gusts = action.payload.gusts;
    },

    setWindGustsActive: (
      state,
      action: PayloadAction<{ index?: number; active: boolean }>
    ) => {
      // state.layers[action.payload.index].wind.gusts.active = action.payload.active
      if (action.payload.index !== undefined) {
        state.layers[action.payload.index].wind.gusts.active =
          action.payload.active;
      } else {
        state.layers.forEach((layer) => {
          layer.wind.gusts.active = action.payload.active;
        });
      }
    },

    setWindGustsIn: (
      state,
      action: PayloadAction<{ index: number; in: Types.In }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in = action.payload.in;
    },

    setWindGustsInDuration: (
      state,
      action: PayloadAction<{ index: number; duration: Types.SizeBounds }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.duration =
        action.payload.duration;
    },

    setWindGustsInDurationMax: (
      state,
      action: PayloadAction<{ index: number; max: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.duration.max =
        action.payload.max;
    },

    setWindGustsInDurationMin: (
      state,
      action: PayloadAction<{ index: number; min: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.duration.min =
        action.payload.min;
    },

    setWindGustsInAdditionalStrength: (
      state,
      action: PayloadAction<{
        index: number;
        additionalStrength: Types.SizeBounds;
      }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.additionalStrength =
        action.payload.additionalStrength;
    },

    setWindGustsInAdditionalStrengthMax: (
      state,
      action: PayloadAction<{ index: number; max: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.additionalStrength.max =
        action.payload.max;
    },

    setWindGustsInAdditionalStrengthMin: (
      state,
      action: PayloadAction<{ index: number; min: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.additionalStrength.min =
        action.payload.min;
    },

    setWindGustsInDelay: (
      state,
      action: PayloadAction<{ index: number; delay: Types.SizeBounds }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.delay =
        action.payload.delay;
    },

    setWindGustsInDelayMax: (
      state,
      action: PayloadAction<{ index: number; max: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.delay.max =
        action.payload.max;
    },

    setWindGustsInDelayMin: (
      state,
      action: PayloadAction<{ index: number; min: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.in.delay.min =
        action.payload.min;
    },

    setWindGustsOut: (
      state,
      action: PayloadAction<{ index: number; out: Types.Out }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out = action.payload.out;
    },

    setWindGustsOutDuration: (
      state,
      action: PayloadAction<{ index: number; duration: Types.SizeBounds }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.duration =
        action.payload.duration;
    },

    setWindGustsOutDurationMax: (
      state,
      action: PayloadAction<{ index: number; max: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.duration.max =
        action.payload.max;
    },

    setWindGustsOutDurationMin: (
      state,
      action: PayloadAction<{ index: number; min: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.duration.min =
        action.payload.min;
    },

    setWindGustsOutDelay: (
      state,
      action: PayloadAction<{ index: number; delay: Types.SizeBounds }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.delay =
        action.payload.delay;
    },

    setWindGustsOutDelayMax: (
      state,
      action: PayloadAction<{ index: number; max: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.delay.max =
        action.payload.max;
    },

    setWindGustsOutDelayMin: (
      state,
      action: PayloadAction<{ index: number; min: number }>
    ) => {
      state.layers[action.payload.index].wind.gusts.out.delay.min =
        action.payload.min;
    },

    setSway: (
      state,
      action: PayloadAction<{ index: number; sway: Types.Sway }>
    ) => {
      state.layers[action.payload.index].sway = action.payload.sway;
    },

    setSwayAmplitude: (
      state,
      action: PayloadAction<{ index: number; amplitude: number }>
    ) => {
      state.layers[action.payload.index].sway.amplitude =
        action.payload.amplitude;
    },

    setSwayFrequency: (
      state,
      action: PayloadAction<{ index: number; frequency: number }>
    ) => {
      state.layers[action.payload.index].sway.frequency =
        action.payload.frequency;
    },

    setWindGustsChangeChance: (
      state,
      action: PayloadAction<{ index?: number; chance: number }>
    ) => {
      if (action.payload.index !== undefined) {
        state.layers[action.payload.index].wind.gusts.changeChance =
          action.payload.chance;
      } else {
        state.layers.forEach((layer) => {
          layer.wind.gusts.changeChance = action.payload.chance;
        });
      }
    },

    moveLayerUp: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (state.layers && index > 0 && index < state.layers.length) {
        // Swap the layer at currentIndex with the one at currentIndex - 1
        const temp = state.layers[index];
        state.layers[index] = state.layers[index - 1];
        state.layers[index - 1] = temp;
      }
    },

    moveLayerDown: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (state.layers && index >= 0 && index < state.layers.length - 1) {
        // Swap the layer at currentIndex with the one at currentIndex + 1
        const temp = state.layers[index];
        state.layers[index] = state.layers[index + 1];
        state.layers[index + 1] = temp;
      }
    },

    setLayerRotation: (state, action: PayloadAction<{ index: number, rotate: boolean }>) => {
      const {rotate, index} = action.payload;
      (state.layers[index] as ImageLayerConfig).rotate = rotate;
    },

    setLayerImage: (state, action: PayloadAction<{ index: number, image: string }>) => {
      const {image, index} = action.payload;
      (state.layers[index] as ImageLayerConfig).image = image;
    },
  },
});

export const {
  resetUserConfig,
  setUserConfig,
  resetAttachTo,
  setAttachTo,
  setColour,
  setDensity,
  setWindGustsActive,
  setMassMax,
  setMassMin,
  setWindStrength,
  setWindGustsChangeChance,
  addLayer,
  resetLayers,
  removeLayer,
  duplicateLayer,
  resetLayer,
  setGravityAngle,
  setGravityStrength,
  setWindGustsInAdditionalStrength,
  setWindGustsInAdditionalStrengthMax,
  setWindGustsInAdditionalStrengthMin,
  setWindGustsInDelay,
  setWindGustsInDelayMax,
  setWindGustsInDelayMin,
  setWindGustsInDuration,
  setWindGustsInDurationMax,
  setWindGustsInDurationMin,
  setWindGustsOutDelay,
  setWindGustsOutDelayMax,
  setWindGustsOutDelayMin,
  setWindGustsOutDuration,
  setWindGustsOutDurationMax,
  setWindGustsOutDurationMin,
  setMass,
  setSway,
  setSwayAmplitude,
  setSwayFrequency,
  setWindAngle,
  moveLayerUp,
  moveLayerDown,
  setLayerRotation,
  setLayerImage,
  setSizeMin,
  setSizeMax,
  setSize,
} = configSlice.actions;

export default configSlice.reducer;
