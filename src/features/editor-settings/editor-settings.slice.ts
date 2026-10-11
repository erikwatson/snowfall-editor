import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Types, type UserSchedule } from "@erikwatson/snowfall";

export type PresetVariation =
  | "none"
  | "snow"
  | "lava"
  | "space"
  | "fallout"
  | "snow2"
  | "classic"
  | "pride"
  | "rain";

export type ExportMode = "js" | "jsx" | "ts" | "tsx" | "html";

export type EditorState = {
  advancedSettings: boolean;
  isMinified: boolean;
  isReact: boolean;
  exportMode?: ExportMode;
  background: string;
  schedule?: Types.UserSchedule;
  preset?: PresetVariation;
};

const DEFAULT_STATE: EditorState = {
  advancedSettings: true,
  isMinified: true,
  isReact: false,
  exportMode: "js",
  background: "#0d0014",
  schedule: undefined,
  preset: "snow2",
};

const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState: DEFAULT_STATE,
  reducers: {
    resetEditorSettings: () => DEFAULT_STATE,

    setEditorSettings: (_state, action: PayloadAction<EditorState>) => {
      return action.payload;
    },

    setAdvancedSettings: (state, action: PayloadAction<boolean>) => {
      state.advancedSettings = action.payload;
    },

    setIsMinified: (state, action: PayloadAction<boolean>) => {
      state.isMinified = action.payload;
    },

    setIsReact: (state, action: PayloadAction<boolean>) => {
      state.isReact = action.payload;
      state.exportMode = action.payload ? "jsx" : "js";
    },

    setExportMode: (state, action: PayloadAction<ExportMode>) => {
      state.exportMode = action.payload;
      state.isReact = action.payload === "jsx" || action.payload === "tsx";
    },

    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },

    setSchedule: (state, action: PayloadAction<UserSchedule | undefined>) => {
      state.schedule = action.payload;
    },

    setPreset: (state, action: PayloadAction<PresetVariation>) => {
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
  setExportMode,
  setBackground,
  setSchedule,
  setPreset,
} = editorSettingsSlice.actions;

export default editorSettingsSlice.reducer;