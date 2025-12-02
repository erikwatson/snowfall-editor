import {
  DEFAULT_WIND_ANGLE,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../../range/range";
import { Control } from "../../../../control/control";
import { setWindAngle } from "../../../../../features/config/config.slice";

type SnowflakeWindAngleProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeWindAngle = ({
  index,
  layer,
}: SnowflakeWindAngleProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Angle"
      tooltip="The angle of the wind"
      showOutput={true}
      reset={() => {
        const angle = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].wind.angle : DEFAULT_WIND_ANGLE;
        dispatch(
          setWindAngle({
            index,
            angle
          })
        );
      }}
      value={layer.wind.angle}
      onChange={(event) =>
        dispatch(
          setWindAngle({
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
