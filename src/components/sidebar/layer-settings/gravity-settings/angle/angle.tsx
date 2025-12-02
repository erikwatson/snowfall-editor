import {
  DEFAULT_GRAVITY_ANGLE,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../../range/range";
import { Control } from "../../../../control/control";
import { setGravityAngle } from "../../../../../features/config/config.slice";

type SnowflakeGravityAngleProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGravityAngle = ({
  index,
  layer,
}: SnowflakeGravityAngleProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Angle"
      tooltip="The angle of the force of gravity, in degrees"
      showOutput={true}
      reset={() => {
        const angle = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].gravity.angle : DEFAULT_GRAVITY_ANGLE;
        dispatch(
          setGravityAngle({
            index,
            angle
          })
        );
      }}
      value={layer.gravity.angle}
      onChange={(event) =>
        dispatch(
          setGravityAngle({
            index,
            angle: Number(event.target.value),
          })
        )
      }
    >
      <Range min="0" max="360" step="1" />
    </Control>
  );
};
