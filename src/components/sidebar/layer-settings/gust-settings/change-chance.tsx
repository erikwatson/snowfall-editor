import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import {
  DEFAULT_LAYERS,
  DEFAULT_WIND_GUSTS_CHANGE_CHANCE,
} from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import { setWindGustsChangeChance } from "../../../../features/config/config.slice";

type SnowflakeGustChangeChangeProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustChangeChange = ({
  layer,
  index,
}: SnowflakeGustChangeChangeProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Change chance"
      tooltip="The chance that the wind gusts will change direction when it completes a cycle"
      showOutput={true}
      reset={() => {
        const chance = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].wind.gusts.changeChance : DEFAULT_WIND_GUSTS_CHANGE_CHANCE;
        dispatch(
          setWindGustsChangeChance({
            index,
            chance: chance,
          })
        );
      }}
      value={Math.round(layer.wind.gusts.changeChance * 100)}
      onChange={(event) =>
        dispatch(
          setWindGustsChangeChance({
            index,
            chance: Number(event.target.value) / 100,
          })
        )
      }
    >
      <Range min={0} max={100} step={1} />
    </Control>
  );
};
