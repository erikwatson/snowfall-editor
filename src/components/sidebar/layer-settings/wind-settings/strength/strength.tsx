import {
  DEFAULT_WIND_STRENGTH,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../../control/control";
import { Range } from "../../../../range/range";
import { setWindStrength } from "../../../../../features/config/config.slice";

type SnowflakeWindStrengthProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeWindStrength = ({
  index,
  layer,
}: SnowflakeWindStrengthProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Strength"
      tooltip="The strength of the wind"
      showOutput={true}
      reset={() => {
        const strength = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].wind.strength : DEFAULT_WIND_STRENGTH;
        dispatch(
          setWindStrength({
            index,
            strength
          })
        );
      }}
      value={layer.wind.strength}
      onChange={(event) =>
        dispatch(
          setWindStrength({
            index,
            strength: Number(event.target.value),
          })
        )
      }
    >
      <Range min={0} max={10} step={1}></Range>
    </Control>
  );
};
