import { useDispatch } from "react-redux";
import {
  EditorState,
  PresetVariation,
  resetEditorSettings,
  setBackground,
  setEditorSettings,
  setPreset,
} from "../../../features/editor-settings/editor-settings.slice";
import { Colour } from "../../colour/colour";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Group } from "../../group/group";
import { PRESET_SNOW } from "../../../presets/snow";
import { resetUserConfig, setUserConfig } from "../../../features/config/config.slice";
import { PRESET_FALLOUT } from "../../../presets/fallout";
import { PRESET_LAVA } from "../../../presets/lava";
import { PRESET_SPACE } from "../../../presets/space";
import { PRESET_CLASSIC } from '../../../presets/classic'
import { Select } from "../../select/select";
import { PRESET_SNOW2 } from "../../../presets/snow2";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../button/button";

type EditorSettingsProps = {
  editorConfig: EditorState;
};

export const EditorSettings = ({ editorConfig }: EditorSettingsProps) => {
  const { background } = editorConfig;
  const dispatch = useDispatch();

  return (
    // <Group name="Editor settings" colour="grey-2" open={true}>
    <>
      <h2>Editor settings</h2>
      {/* <Button kind="transparent" onClick={() => null} tooltip={'These settings are NOT exported with your config.'}>
        <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#64748b' }} />
      </Button> */}
      <p>These settings are <b>not</b> exported with your config.</p>
      <ControlGroup>
        <Control
          name="Preset"
          tooltip="Select a preset"
          value={editorConfig.preset}
          reset={() => {
            dispatch(setPreset('none'));
            dispatch(resetUserConfig())
            dispatch(resetEditorSettings())
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
              default:
                dispatch(setPreset('none'));
                dispatch(resetUserConfig())
                dispatch(resetEditorSettings())
                break;
            }
          }}
        >
          <Select>
            <option value="snow">Snow</option>
            <option value="classic">Classic snow</option>
            <option value="snow2">Snow with images</option>
            <option value="lava">Lava</option>
            <option value="space">Space</option>
            {/* <option value="fallout">Fallout</option> */}
          </Select>
        </Control>

        <Control
          name="Background"
          tooltip="The background colour of the snowfall simulation"
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
    // </Group>
  );
};
