import {
  DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN,
  DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MAX,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setWindGustsInAdditionalStrengthMax,
  setWindGustsInAdditionalStrengthMin,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeGustAdditionalStrengthProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustAdditionalStrength = ({
  index,
  layer,
}: SnowflakeGustAdditionalStrengthProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="secondary" key={index} name={"Additional strength"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The smallest amount to increase the wind by when it's gusty"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.additionalStrength.min
                  : DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN;
              dispatch(
                setWindGustsInAdditionalStrengthMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.wind.gusts.in.additionalStrength.min}
            onChange={(event) =>
              dispatch(
                setWindGustsInAdditionalStrengthMin({
                  index,
                  min: Number(event.target.value),
                })
              )
            }
          >
            <Range min={0} max={100} step={1} />
          </Control>
          <Control
            name="Maximum"
            tooltip="The largest amount to increase the wind by when it's gusty"
            showOutput={true}
            reset={() => {
              const max =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.additionalStrength.max
                  : DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MAX;
              dispatch(
                setWindGustsInAdditionalStrengthMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.wind.gusts.in.additionalStrength.max}
            onChange={(event) =>
              dispatch(
                setWindGustsInAdditionalStrengthMax({
                  index,
                  max: Number(event.target.value),
                })
              )
            }
          >
            <Range min={0} max={100} step={1} />
          </Control>
        </ControlGroup>
      </Group>
    </>
  );
};
