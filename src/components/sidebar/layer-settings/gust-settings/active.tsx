import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { DEFAULT_LAYERS, DEFAULT_WIND_GUSTS_ACTIVE } from "@erikwatson/snowfall";
import { CheckBox } from "../../../checkbox/checkbox";
import { setWindGustsActive } from "../../../../features/config/config.slice";

type SnowflakeGustActiveProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustActive = ({ layer, index }: SnowflakeGustActiveProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Active"
      tooltip="Should the wind gust, or not?"
      reset={() => {
        const active = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].wind.gusts.active : DEFAULT_WIND_GUSTS_ACTIVE;
        dispatch(
          setWindGustsActive({
            index,
            active
          })
        );
      }}
      value={layer.wind.gusts.active}
      onChange={(event) => {
        dispatch(
          setWindGustsActive({
            index,
            active: event.target.checked,
          })
        );
      }}
    >
      <CheckBox />
    </Control>
  );
};
