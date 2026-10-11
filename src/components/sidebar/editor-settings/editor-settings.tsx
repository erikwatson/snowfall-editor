import { useDispatch } from "react-redux";
import {
  EditorState,
  PresetVariation,
  resetEditorSettings,
  setBackground,
  setEditorSettings,
  setExportMode,
  setIsReact,
  setPreset,
} from "../../../features/editor-settings/editor-settings.slice";
import { Colour } from "../../colour/colour";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { PRESET_SNOW } from "../../../presets/snow";
import { resetUserConfig, setUserConfig } from "../../../features/config/config.slice";
import { PRESET_FALLOUT } from "../../../presets/fallout";
import { PRESET_LAVA } from "../../../presets/lava";
import { PRESET_SPACE } from "../../../presets/space";
import { PRESET_CLASSIC } from '../../../presets/classic'
import { PRESET_PRIDE } from "../../../presets/pride";
import { Select } from "../../select/select";
import { PRESET_SNOW2 } from "../../../presets/snow2";
import e from "express";
import { PRESET_RAIN } from "../../../presets/rain";

type EditorSettingsProps = {
  editorConfig: EditorState;
};

export const EditorSettings = ({ editorConfig }: EditorSettingsProps) => {
  const { background } = editorConfig;
  const exportMode = editorConfig.exportMode ?? (editorConfig.isReact ? "jsx" : "js");
  const dispatch = useDispatch();

  return (
    <>
      <h2>Editor settings</h2>
      <p>These settings are <b>not</b> exported with your config.</p>
      <ControlGroup>
        <Control
          name="Preset"
          tooltip="Some fun and inspiring presets to try"
          value={editorConfig.preset}
          reset={() => {
            dispatch(setPreset('snow2'))
            dispatch(setUserConfig(PRESET_SNOW2.userConfig));
            dispatch(setEditorSettings(PRESET_SNOW2.editorConfig));
          }}
          onChange={(event) => {
            const value = event.target.value as PresetVariation
            switch (value) {
              case "snow":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_SNOW.userConfig));
                dispatch(setEditorSettings(PRESET_SNOW.editorConfig));
                break;
              case "snow2":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_SNOW2.userConfig));
                dispatch(setEditorSettings(PRESET_SNOW2.editorConfig));
                break;
              case "lava":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_LAVA.userConfig));
                dispatch(setEditorSettings(PRESET_LAVA.editorConfig));
                break;
              case "space":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_SPACE.userConfig));
                dispatch(setEditorSettings(PRESET_SPACE.editorConfig));
                break;
              case "fallout":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_FALLOUT.userConfig));
                dispatch(setEditorSettings(PRESET_FALLOUT.editorConfig));
                break;
              case "classic":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_CLASSIC.userConfig));
                dispatch(setEditorSettings(PRESET_CLASSIC.editorConfig));
                break;
              case "pride":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_PRIDE.userConfig));
                dispatch(setEditorSettings(PRESET_PRIDE.editorConfig));
                break;
              case "rain":
                dispatch(setPreset(value))
                dispatch(setUserConfig(PRESET_RAIN.userConfig));
                dispatch(setEditorSettings(PRESET_RAIN.editorConfig));
                break;
            }
          }}
        >
          <Select>
            <option value="snow">Snow</option>
            {/* <option value="classic">Classic snow</option> */}
            <option value="snow2">Snow with images</option>
            <option value="lava">Lava</option>
            <option value="space">Space</option>
            <option value="rain">Rain</option>
          </Select>
        </Control>

        <Control
          name="Export"
          tooltip="Choose the language and environment for the generated code."
          showOutput={false}
          reset={() => dispatch(setExportMode("js"))}
          value={exportMode}
         onChange={(event) => {
            dispatch(
              setExportMode(
                event.target.value as "js" | "jsx" | "ts" | "tsx" | "html"
              )
            );
          }}
        >
          <Select>
            <option value="html">HTML (CDN)</option>
            <option value="js">JavaScript</option>
            <option value="jsx">JSX (React)</option>
            <option value="ts">TypeScript</option>
            <option value="tsx">TSX (React)</option>
          </Select>
        </Control>

        <Control
          name="Background"
          tooltip="For testing purposes, you can set the background colour of the page here"
          showOutput={true}
          reset={() => {
            dispatch(setBackground(PRESET_SNOW.editorConfig.background));
          }}
          value={background}
          onChange={(event) => dispatch(setBackground(event.target.value))}
        >
          <Colour />
        </Control>
      </ControlGroup>
    </>
  );
};
