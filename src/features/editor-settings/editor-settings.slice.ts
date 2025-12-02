import { createSlice } from "@reduxjs/toolkit";
import {
  Types,
} from "@erikwatson/snowfall";
import { UserSchedule } from "@erikwatson/snowfall/dist/types";

export type PresetVariation = 'none' | 'snow' | 'lava' | 'space' | 'fallout' | 'snow2' | 'classic';

export type EditorState = {
  advancedSettings: boolean;
  isMinified: boolean;
  isReact: boolean;
  background: string;
  schedule?: Types.UserSchedule;
  preset?: PresetVariation;
}

const DEFAULT_STATE: EditorState = {
  advancedSettings: true,
  isMinified: true,
  isReact: false,
  background: "#0d0014",
  schedule: undefined,
  preset: 'snow',
};

const initialState = DEFAULT_STATE;

const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState,
  reducers: {
    resetEditorSettings: (state) => {
      return DEFAULT_STATE;
    },

    setEditorSettings: (state, action: { payload: EditorState }) => {
      return action.payload;
    },

    setAdvancedSettings: (state, action: { payload: boolean }) => {
      state.advancedSettings = action.payload;
    },

    setIsMinified: (state, action: { payload: boolean }) => {
      state.isMinified = action.payload;
    },

    setIsReact: (state, action: { payload: boolean }) => {
      state.isReact = action.payload;
    },

    setBackground: (state, action: { payload: string }) => {
      state.background = action.payload;
    },

    setSchedule: (state, action: { payload?: UserSchedule }) => {
      state.schedule = action.payload;
    },

    setPreset: (state, action: { payload: PresetVariation }) => {
      state.preset = action.payload;
    },
  },
});

export const {
  resetEditorSettings,
  setEditorSettings,
  setAdvancedSettings,
  setIsMinified,
  setIsReact,
  setBackground,
  setSchedule,
  setPreset,
} = editorSettingsSlice.actions;

export default editorSettingsSlice.reducer;
