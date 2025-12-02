import {
  DEFAULT_MASS_MAX,
  DEFAULT_MASS_MIN,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setMassMax,
  setMassMin,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeMassProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeMass = ({ index, layer }: SnowflakeMassProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="grey-2" key={index} name={"Mass"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The minimum mass of the snowflakes"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].mass.min
                  : DEFAULT_MASS_MIN;
              dispatch(
                setMassMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.mass.min}
            onChange={(event) =>
              dispatch(
                setMassMin({
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
                  ? DEFAULT_LAYERS[index].mass.max
                  : DEFAULT_MASS_MAX;
              dispatch(
                setMassMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.mass.max}
            onChange={(event) =>
              dispatch(
                setMassMax({
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
