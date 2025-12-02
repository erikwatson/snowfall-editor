import { Types } from "@erikwatson/snowfall";
import { EditorState } from "../features/editor-settings/editor-settings.slice";
import { PRESET_LAVA } from "./lava";
import { PRESET_SNOW } from "./snow";
import { PRESET_SPACE } from "./space";
import { PRESET_FALLOUT } from "./fallout";
import { PRESET_SNOW2 } from "./snow2";

export type Preset = {
  name: string;
  userConfig: Types.CompleteUserConfig;
  editorConfig: EditorState;
}

export const PRESETS: Preset[] = [
  PRESET_LAVA, 
  PRESET_SPACE,
  PRESET_SNOW,
  PRESET_FALLOUT,
  PRESET_SNOW2
];
