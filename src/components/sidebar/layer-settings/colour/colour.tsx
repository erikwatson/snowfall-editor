import { DEFAULT_SNOW_COLOR } from "@erikwatson/snowfall";
import { Colour } from "../../../colour/colour";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { setColour } from '../../../../features/config/config.slice'

type SnowflakeColourProps = {
  index: number;
  layer: Types.SimpleLayerConfig;
};

export const SnowflakeColour = ({ index, layer }: SnowflakeColourProps) => {
  const dispatch = useDispatch();

  return (
    <Control
      name="Colour"
      tooltip="The colour of the snowflakes"
      showOutput={true}
      reset={() => {
        const colour = DEFAULT_SNOW_COLOR;
        dispatch(
          setColour({
            index,
            colour
          })
        );
      }}
      value={layer.colour}
      onChange={(event) =>
        dispatch(
          setColour({
            index,
            colour: event.target.value,
          })
        )
      }
    >
      <Colour />
    </Control>
  );
};
