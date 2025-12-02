import {
  DEFAULT_LAYERS,
  DEFAULT_WIND_OUT_DELAY_MIN,
} from "@erikwatson/snowfall";
import { Types } from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Range } from "../../../range/range";
import {
  setWindGustsOutDelayMin,
  setWindGustsOutDelayMax,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeGustOutDelayProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustOutDelay = ({
  index,
  layer,
}: SnowflakeGustOutDelayProps) => {
  const dispatch = useDispatch();

  return (
    <Group colour="secondary" key={index} name={"Delay"}>
      <ControlGroup>
        <Control
          name="Minimum"
          tooltip="The minimum delay between wind gusts"
          showOutput={true}
          reset={() => {
            const min =
              index < DEFAULT_LAYERS.length
                ? DEFAULT_LAYERS[index].wind.gusts.out.delay.min
                : DEFAULT_WIND_OUT_DELAY_MIN;
            dispatch(
              setWindGustsOutDelayMin({
                index,
                min,
              })
            );
          }}
          value={layer.wind.gusts.out.delay.min}
          onChange={(event) =>
            dispatch(
              setWindGustsOutDelayMin({
                index,
                min: Number(event.target.value),
              })
            )
          }
        >
          <Range min="0" max="100" step="1" />
        </Control>
        <Control
          name="Maximum"
          tooltip="The maximum delay between wind gusts"
          showOutput={true}
          reset={() => {
            const max =
              index < DEFAULT_LAYERS.length
                ? DEFAULT_LAYERS[index].wind.gusts.out.delay.max
                : DEFAULT_WIND_OUT_DELAY_MIN;
            dispatch(
              setWindGustsOutDelayMax({
                index,
                max,
              })
            );
          }}
          value={layer.wind.gusts.out.delay.max}
          onChange={(event) =>
            dispatch(
              setWindGustsOutDelayMax({
                index,
                max: Number(event.target.value),
              })
            )
          }
        >
          <Range min="0" max="100" step="1" />
        </Control>
      </ControlGroup>
    </Group>
  );
};
