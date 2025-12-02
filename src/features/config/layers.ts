import { DEFAULT_LAYERS, DEFAULT_SIMPLE_LAYER } from '@erikwatson/snowfall'
import { Types, isSimpleLayer } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { isSimpleLayer } from '../../utils';

const initialState: Types.ConfigLayer[] = DEFAULT_LAYERS;

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    reset: (state) => {
      return DEFAULT_LAYERS
    },

    resetLayer: (state, action: PayloadAction<number>) => {
      if (action.payload < DEFAULT_LAYERS.length) {
        state[action.payload] = DEFAULT_LAYERS[action.payload]
      } else {
        state[action.payload] = DEFAULT_SIMPLE_LAYER
      }
    },

    setLayers: (state, action: PayloadAction<Types.ConfigLayer[]>) => {
      state = action.payload
    },

    setLayer: (state, action: PayloadAction<{ index: number, layer: Types.ConfigLayer }>) => {
      state[action.payload.index] = action.payload.layer
    },

    addLayer: (state, action: PayloadAction<Types.ConfigLayer>) => {
      state.push(action.payload)
    },

    removeLayer: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },

    updateLayer: (state, action: PayloadAction<{ index: number, layer: Types.ConfigLayer }>) => {
      state[action.payload.index] = action.payload.layer
    },

    duplicateLayer: (state, action: PayloadAction<number>) => {
      state.push(state[action.payload])
    },

    setColour: (state, action: PayloadAction<{ index: number; colour: string }>) => {
      const layer = state[action.payload.index];
      if (layer && isSimpleLayer(layer)) {
        layer.colour = action.payload.colour;
      }
    },

    setDensity: (state, action: PayloadAction<{ index?: number, density: number }>) => {
      if (action.payload.index !== undefined) {
        state[action.payload.index].density = action.payload.density
      } else {
        state.forEach((layer) => {
          layer.density = action.payload.density
        })
      }
    },

    setMass: (state, action: PayloadAction<{ index: number, mass: Types.SizeBounds }>) => {
      state[action.payload.index].mass = action.payload.mass
    },

    setMassMax: (state, action: PayloadAction<{ index?: number, max: number }>) => {
      if (action.payload.index !== undefined) {
        if (action.payload.max < state[action.payload.index].mass.min) {
          state[action.payload.index].mass.min = action.payload.max
        }
        state[action.payload.index].mass.max = action.payload.max
      } else {
        state.forEach((layer) => {
          if (action.payload.max < layer.mass.min) {
            layer.mass.min = action.payload.max
          }
          layer.mass.max = action.payload.max
        })
      }      
    },

    setMassMin: (state, action: PayloadAction<{ index?: number, min: number }>) => {
      // we need to set the max mass to the min mass if it's less than the min mass
      if (action.payload.index !== undefined) {
        if (action.payload.min > state[action.payload.index].mass.max) {
          state[action.payload.index].mass.max = action.payload.min
        }
        state[action.payload.index].mass.min = action.payload.min
      } else {
        state.forEach((layer) => {
          if (action.payload.min > layer.mass.max) {
            layer.mass.max = action.payload.min
          }
          layer.mass.min = action.payload.min
        })
      }
    },

    setGravity: (state, action: PayloadAction<{ index: number, gravity: { angle: number, strength: number } }>) => {
      state[action.payload.index].gravity = action.payload.gravity
    },

    setGravityAngle: (state, action: PayloadAction<{ index: number, angle: number }>) => {
      state[action.payload.index].gravity.angle = action.payload.angle
    },

    setGravityStrength: (state, action: PayloadAction<{ index: number, strength: number }>) => {  
      state[action.payload.index].gravity.strength = action.payload.strength
    },

    setWind: (state, action: PayloadAction<{ index: number, wind: Types.Wind }>) => {
      state[action.payload.index].wind = action.payload.wind
    },

    setWindAngle: (state, action: PayloadAction<{ index: number, angle: number }>) => {
      state[action.payload.index].wind.angle = action.payload.angle
    },

    setWindStrength: (state, action: PayloadAction<{ index?: number, strength: number }>) => {
      if (action.payload.index !== undefined) {
        state[action.payload.index].wind.strength = action.payload.strength
      } else {
        state.forEach((layer) => {
          layer.wind.strength = action.payload.strength
        })
      }
    },

    setWindGusts: (state, action: PayloadAction<{ index: number, gusts: Types.Gusts }>) => {
      state[action.payload.index].wind.gusts = action.payload.gusts
    },

    setWindGustsActive: (state, action: PayloadAction<{ index?: number, active: boolean }>) => {
      // state[action.payload.index].wind.gusts.active = action.payload.active
      if (action.payload.index !== undefined) {
        state[action.payload.index].wind.gusts.active = action.payload.active
      } else {
        state.forEach((layer) => {
          layer.wind.gusts.active = action.payload.active
        })
      }
    },

    setWindGustsIn: (state, action: PayloadAction<{ index: number, in: Types.In }>) => {
      state[action.payload.index].wind.gusts.in = action.payload.in
    },

    setWindGustsInDuration: (state, action: PayloadAction<{ index: number, duration: Types.SizeBounds }>) => {
      state[action.payload.index].wind.gusts.in.duration = action.payload.duration
    },

    setWindGustsInDurationMax: (state, action: PayloadAction<{ index: number, max: number }>) => {
      state[action.payload.index].wind.gusts.in.duration.max = action.payload.max
    },

    setWindGustsInDurationMin: (state, action: PayloadAction<{ index: number, min: number }>) => {
      state[action.payload.index].wind.gusts.in.duration.min = action.payload.min
    },

    setWindGustsInAdditionalStrength: (state, action: PayloadAction<{ index: number, additionalStrength: Types.SizeBounds }>) => {
      state[action.payload.index].wind.gusts.in.additionalStrength = action.payload.additionalStrength
    },

    setWindGustsInAdditionalStrengthMax: (state, action: PayloadAction<{ index: number, max: number }>) => {
      state[action.payload.index].wind.gusts.in.additionalStrength.max = action.payload.max
    },

    setWindGustsInAdditionalStrengthMin: (state, action: PayloadAction<{ index: number, min: number }>) => {
      state[action.payload.index].wind.gusts.in.additionalStrength.min = action.payload.min
    },

    setWindGustsInDelay: (state, action: PayloadAction<{ index: number, delay: Types.SizeBounds }>) => {
      state[action.payload.index].wind.gusts.in.delay = action.payload.delay
    },

    setWindGustsInDelayMax: (state, action: PayloadAction<{ index: number, max: number }>) => {
      state[action.payload.index].wind.gusts.in.delay.max = action.payload.max
    },

    setWindGustsInDelayMin: (state, action: PayloadAction<{ index: number, min: number }>) => {
      state[action.payload.index].wind.gusts.in.delay.min = action.payload.min
    },

    setWindGustsOut: (state, action: PayloadAction<{ index: number, out: Types.Out }>) => {
      state[action.payload.index].wind.gusts.out = action.payload.out
    },

    setWindGustsOutDuration: (state, action: PayloadAction<{ index: number, duration: Types.SizeBounds }>) => {
      state[action.payload.index].wind.gusts.out.duration = action.payload.duration
    },

    setWindGustsOutDurationMax: (state, action: PayloadAction<{ index: number, max: number }>) => {
      state[action.payload.index].wind.gusts.out.duration.max = action.payload.max
    },

    setWindGustsOutDurationMin: (state, action: PayloadAction<{ index: number, min: number }>) => {
      state[action.payload.index].wind.gusts.out.duration.min = action.payload.min
    },

    setWindGustsOutDelay: (state, action: PayloadAction<{ index: number, delay: Types.SizeBounds }>) => {
      state[action.payload.index].wind.gusts.out.delay = action.payload.delay
    },

    setWindGustsOutDelayMax: (state, action: PayloadAction<{ index: number, max: number }>) => {
      state[action.payload.index].wind.gusts.out.delay.max = action.payload.max
    },

    setWindGustsOutDelayMin: (state, action: PayloadAction<{ index: number, min: number }>) => {
      state[action.payload.index].wind.gusts.out.delay.min = action.payload.min
    },

    setSway: (state, action: PayloadAction<{ index: number, sway: Types.Sway }>) => {
      state[action.payload.index].sway = action.payload.sway
    },

    setSwayAmplitude: (state, action: PayloadAction<{ index: number, amplitude: number }>) => {
      state[action.payload.index].sway.amplitude = action.payload.amplitude
    },

    setSwayFrequency: (state, action: PayloadAction<{ index: number, frequency: number }>) => {
      state[action.payload.index].sway.frequency = action.payload.frequency
    },

    setWindGustsChangeChance: (state, action: PayloadAction<{ index?: number, chance: number }>) => {
      if (action.payload.index !== undefined) {
        state[action.payload.index].wind.gusts.changeChance = action.payload.chance
      } else {
        state.forEach((layer) => {
          layer.wind.gusts.changeChance = action.payload.chance
        })
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { setLayers } = layersSlice.actions

export default layersSlice.reducer

