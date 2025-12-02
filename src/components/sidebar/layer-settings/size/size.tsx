import {
  DEFAULT_SIZE_MAX,
  DEFAULT_SIZE_MIN,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setSizeMax,
  setSizeMin,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeSizeProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeSize = ({ index, layer }: SnowflakeSizeProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="grey-2" key={index} name={"Size"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The minimum size of the snowflakes"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].size.min
                  : DEFAULT_SIZE_MIN;
              dispatch(
                setSizeMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.size.min}
            onChange={(event) =>
              dispatch(
                setSizeMin({
                  index,
                  min: Number(event.target.value),
                })
              )
            }
          >
            <Range min="0" max="10" step="1" />
          </Control>

          <Control
            name="Maximum"
            tooltip="The maximum size of the snowflakes"
            showOutput={true}
            reset={() => {
              const max =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].size.max
                  : DEFAULT_SIZE_MAX;
              dispatch(
                setSizeMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.size.max}
            onChange={(event) =>
              dispatch(
                setSizeMax({
                  index,
                  max: Number(event.target.value),
                })
              )
            }
          >
            <Range min="0" max="10" step="1" />
          </Control>
        </ControlGroup>
      </Group>
    </>
  );
};
