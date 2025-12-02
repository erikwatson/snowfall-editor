import {
  DEFAULT_DENSITY,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import { setDensity } from "../../../../features/config/config.slice";

type SnowflakeDensityProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeDensity = ({ index, layer }: SnowflakeDensityProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Density"
      tooltip="The amount of snowflakes to draw"
      showOutput={true}
      reset={() => {
        const density = index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index].density : DEFAULT_DENSITY;

        dispatch(
          setDensity({
            index,
            density
          })
        );
      }}
      value={layer.density || 0}
      onChange={(event) => {
        dispatch(
          setDensity({
            index,
            density: Number(event.target.value),
          })
        );
      }}
    >
      <Range min="0" max="1000" step="1" />
    </Control>
  );
};
