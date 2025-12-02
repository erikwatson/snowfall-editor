import {
  DEFAULT_USER_CONFIG,
  DEFAULT_GRAVITY_STRENGTH,
  DEFAULT_FREQUENCY,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../../control/control";
import { Range } from "../../../../range/range";
import { setSwayFrequency } from "../../../../../features/config/config.slice";

type SnowflakeSwayFrequencyProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeSwayFrequency = ({
  index,
  layer,
}: SnowflakeSwayFrequencyProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Frequency"
      tooltip="The frequency of the sway"
      showOutput={true}
      reset={() => {
        const frequency = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].sway.frequency : DEFAULT_FREQUENCY;
        dispatch(
          setSwayFrequency({
            index,
            frequency
          })
        );
      }}
      value={layer.sway.frequency}
      onChange={(event) =>
        dispatch(
          setSwayFrequency({
            index,
            frequency: Number(event.target.value),
          })
        )
      }
    >
      <Range min="0" max="10" step="0.001" />
    </Control>
  );
};
