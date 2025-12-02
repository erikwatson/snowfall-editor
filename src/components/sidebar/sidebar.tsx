import { Heading } from "./heading/heading";
import "./sidebar.css";
import { Types } from "@erikwatson/snowfall";
import { Output } from "../output/output";
import { GeneralSettings } from "./general-settings/general-settings";
import { useDispatch } from "react-redux";
import { LayerSettings } from "./layer-settings/layer-settings";
import copyToClipboard from "copy-to-clipboard";
import {
  resetUserConfig,
} from "../../features/config/config.slice";
import {
  EditorState,
} from "../../features/editor-settings/editor-settings.slice";
import { EditorSettings } from "./editor-settings/editor-settings";
import { DragDropContext } from '@hello-pangea/dnd';
import { Footer } from "./footer/footer";

type SidebarProps = {
  config: Types.UserConfig;
  editorConfig: EditorState;
  difference: Types.UserConfig;
};

export const Sidebar = ({ config, editorConfig, difference }: SidebarProps) => {
  const dispatch = useDispatch();

  const onDragEnd = () => {}

  return (
    <div id="sidebar">
      <Heading advanced={editorConfig.advancedSettings}></Heading>
      <div className="snow-layers-gap">
        <div className="layers-container">
          <EditorSettings editorConfig={editorConfig}></EditorSettings>

          <div style={{ padding: '36px 0' }}>
          <GeneralSettings
            attachTo={config.attachTo}
            background={config.background}
          />

          <LayerSettings
            advancedSettings={editorConfig.advancedSettings}
            preset={editorConfig.preset}
            layers={config.layers}
          ></LayerSettings>        
          </div>
        </div>
      </div>

      <Output
        config={difference}
        largeConfig={config}
        title="Config"
        isMinified={editorConfig.isMinified}
        isReact={editorConfig.isReact}
        schedule={editorConfig.schedule}
        reset={() => {
          dispatch(resetUserConfig());
        }}
        copy={(value) => {
          copyToClipboard(value);
        }}
      />
      <Footer advanced={editorConfig.advancedSettings}></Footer>
    </div>
  );
};
