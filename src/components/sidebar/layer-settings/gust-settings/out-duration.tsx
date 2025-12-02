import {
  DEFAULT_WIND_OUT_DURATION_MIN,
  DEFAULT_WIND_OUT_DURATION_MAX,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Types } from "@erikwatson/snowfall";
import { useDispatch } from "react-redux";
import { Control } from "../../../control/control";
import { Range } from "../../../range/range";
import {
  setWindGustsOutDurationMin,
  setWindGustsOutDurationMax,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeGustOutDurationProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustOutDuration = ({
  index,
  layer,
}: SnowflakeGustOutDurationProps) => {
  const dispatch = useDispatch();
  return (
    <Group colour="secondary" key={index} name={"Duration"}>
      <ControlGroup>
        <Control
          name="Minimum"
          tooltip="The minimum duration of wind gusts"
          showOutput={true}
          reset={() => {
            const min =
              index < DEFAULT_LAYERS.length
                ? DEFAULT_LAYERS[index].wind.gusts.out.duration.min
                : DEFAULT_WIND_OUT_DURATION_MIN;
            dispatch(
              setWindGustsOutDurationMin({
                index,
                min,
              })
            );
          }}
          value={layer.wind.gusts.out.duration.min}
          onChange={(event) =>
            dispatch(
              setWindGustsOutDurationMin({
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
          tooltip="The maximum duration of wind gusts"
          showOutput={true}
          reset={() => {
            const max =
              index < DEFAULT_LAYERS.length
                ? DEFAULT_LAYERS[index].wind.gusts.out.duration.max
                : DEFAULT_WIND_OUT_DURATION_MAX;
            dispatch(
              setWindGustsOutDurationMax({
                index,
                max,
              })
            );
          }}
          value={layer.wind.gusts.out.duration.max}
          onChange={(event) =>
            dispatch(
              setWindGustsOutDurationMax({
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
