import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import {
  DEFAULT_CONTAINER_ID,
  DEFAULT_USER_CONFIG,
} from "@erikwatson/snowfall";
import { diff } from "@erikwatson/snowfall";

import { Sidebar } from "./components/sidebar/sidebar";
import { Snowfall } from "./components/snowfall/snowfall";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { Types } from '@erikwatson/snowfall'
import { PRESET_FALLOUT } from "./presets/fallout";
import { PRESET_LAVA } from "./presets/lava";
import { PRESET_SNOW } from "./presets/snow";
import { PRESET_SPACE } from "./presets/space";
import { setUserConfig } from "./features/config/config.slice";
import { setEditorSettings } from "./features/editor-settings/editor-settings.slice";

export const App = () => {

  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.userConfig);
  const editorConfig = useSelector((state: RootState) => state.editorSettings);

  const [difference, setDifference] = useState(() => {
    const d = diff(config || DEFAULT_USER_CONFIG);
    return Object.freeze(d); // prevents mutation
  });

  const debouncedSetDifference = useCallback(
    debounce((newDifference: Partial<Types.UserConfig>) => {
      setDifference(newDifference);
    }, 300), []); 

  useEffect(() => {
    const diffConfig = diff(config);

    if (JSON.stringify(diffConfig) !== JSON.stringify(difference)) {
      debouncedSetDifference(diffConfig); 
    }
  }, [config]);

  useEffect(() => {
      const element = document.getElementById(DEFAULT_CONTAINER_ID);
      if (element) {
        element.style.backgroundColor = editorConfig.background;
      }
    }, [editorConfig.background]);

  useEffect(() => {
    const preset = editorConfig.preset;
    const value = preset === 'snow' ? PRESET_SNOW :
                                preset === 'lava' ? PRESET_LAVA :
                                preset === 'space' ? PRESET_SPACE :
                                preset === 'fallout' ? PRESET_FALLOUT :
                                null;
    if (value) {
      dispatch(setUserConfig(value.userConfig));
      dispatch(setEditorSettings(value.editorConfig));
      console.log('test')
    }
  }, []);

  return (
    <div id="app">
      <Sidebar config={config} editorConfig={editorConfig} difference={difference}></Sidebar>
      <Snowfall config={difference} />
    </div>
  );
};
