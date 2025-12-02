import { DEFAULT_AMPLITUDE, DEFAULT_LAYERS } from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../../range/range";
import { Control } from "../../../../control/control";
import { setSwayAmplitude } from "../../../../../features/config/config.slice";

type SnowflakeSwayAmplitudeProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeSwayAmplitude = ({
  index,
  layer,
}: SnowflakeSwayAmplitudeProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Amplitude"
      tooltip="The amplitude of the sway"
      showOutput={true}
      reset={() => {
        const amplitude = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].sway.amplitude : DEFAULT_AMPLITUDE;
        dispatch(
          setSwayAmplitude({
            index,
            amplitude
          })
        );
      }}
      value={layer.sway.amplitude}
      onChange={(event) =>
        dispatch(
          setSwayAmplitude({
            index,
            amplitude: Number(event.target.value),
          })
        )
      }
    >
      <Range min="0" max="5" step="0.01" />
    </Control>
  );
};
