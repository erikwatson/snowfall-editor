import {
  DEFAULT_GRAVITY_STRENGTH,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../../control/control";
import { Range } from "../../../../range/range";
import { setGravityStrength } from "../../../../../features/config/config.slice";



type SnowflakeGravityStrengthProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGravityStrength = ({
  index,
  layer,
}: SnowflakeGravityStrengthProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Strength"
      tooltip="The strength of the force of gravity"
      showOutput={true}
      reset={() => {
        const strength = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].gravity.strength : DEFAULT_GRAVITY_STRENGTH;
        dispatch(
          setGravityStrength({
            index,
            strength
          })
        );
      }}
      value={layer.gravity.strength}
      onChange={(event) =>
        dispatch(
          setGravityStrength({
            index,
            strength: Number(event.target.value),
          })
        )
      }
    >
      <Range min="0" max="5" step="0.1" />
    </Control>
  );
};
