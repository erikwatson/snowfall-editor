import {
  DEFAULT_SIZE_MAX,
  DEFAULT_SIZE_MIN,
  DEFAULT_LAYERS,
  DEFAULT_OPACITY_MAX,
  DEFAULT_OPACITY_MIN,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setOpacityMax,
  setOpacityMin,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeOpacityProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeOpacity = ({ index, layer }: SnowflakeOpacityProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="grey-2" key={index} name={"Opacity"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The minimum opacity of the snowflakes"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].opacity.min
                  : DEFAULT_OPACITY_MIN;
              dispatch(
                setOpacityMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.opacity.min}
            onChange={(event) =>
              dispatch(
                setOpacityMin({
                  index,
                  min: Number(event.target.value),
                })
              )
            }
          >
            <Range min="0" max="1" step="0.01" />
          </Control>

          <Control
            name="Maximum"
            tooltip="The maximum opacity of the snowflakes"
            showOutput={true}
            reset={() => {
              const max =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].opacity.max
                  : DEFAULT_OPACITY_MAX;
              dispatch(
                setOpacityMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.opacity.max}
            onChange={(event) =>
              dispatch(
                setOpacityMax({
                  index,
                  max: Number(event.target.value),
                })
              )
            }
          >
            <Range min="0" max="1" step="0.01" />
          </Control>
        </ControlGroup>
      </Group>
    </>
  );
};
