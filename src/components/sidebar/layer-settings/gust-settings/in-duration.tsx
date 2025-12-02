import {
  DEFAULT_WIND_IN_DURATION_MIN,
  DEFAULT_WIND_IN_DURATION_MAX,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Control } from "../../../control/control";
import { useDispatch } from "react-redux";
import { Types } from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setWindGustsInDurationMax,
  setWindGustsInDurationMin,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeGustInDurationProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustInDuration = ({
  index,
  layer,
}: SnowflakeGustInDurationProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="secondary" key={index} name={"Duration"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The minimum duration of a gust"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.duration.min
                  : DEFAULT_WIND_IN_DURATION_MIN;
              dispatch(
                setWindGustsInDurationMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.wind.gusts.in.duration.min}
            onChange={(event) =>
              dispatch(
                setWindGustsInDurationMin({
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
            tooltip="The maximum duration of a gust"
            showOutput={true}
            reset={() => {
              const max =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.duration.max
                  : DEFAULT_WIND_IN_DURATION_MAX;
              dispatch(
                setWindGustsInDurationMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.wind.gusts.in.duration.max}
            onChange={(event) => {
              dispatch(
                setWindGustsInDurationMax({
                  index,
                  max: Number(event.target.value),
                })
              );
            }}
          >
            <Range min="0" max="100" step="1" />
          </Control>
        </ControlGroup>
      </Group>
    </>
  );
};
