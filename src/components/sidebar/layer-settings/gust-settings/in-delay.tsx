import { useDispatch } from "react-redux";
import { Control } from "../../../control/control";
import { Types } from "@erikwatson/snowfall";
import {
  DEFAULT_WIND_IN_DELAY_MIN,
  DEFAULT_WIND_IN_DELAY_MAX,
  DEFAULT_LAYERS,
} from "@erikwatson/snowfall";
import { Range } from "../../../range/range";
import {
  setWindGustsInDelayMin,
  setWindGustsInDelayMax,
} from "../../../../features/config/config.slice";
import { ControlGroup } from "../../../controlGroup/controlGroup";
import { Group } from "../../../group/group";

type SnowflakeGustInDelayProps = {
  index: number;
  layer: Types.ConfigLayer;
};

export const SnowflakeGustInDelay = ({
  index,
  layer,
}: SnowflakeGustInDelayProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Group colour="secondary" key={index} name={"Delay"}>
        <ControlGroup>
          <Control
            name="Minimum"
            tooltip="The minimum delay, in ms, before the wind begins to gust"
            showOutput={true}
            reset={() => {
              const min =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.delay.min
                  : DEFAULT_WIND_IN_DELAY_MIN;
              dispatch(
                setWindGustsInDelayMin({
                  index,
                  min,
                })
              );
            }}
            value={layer.wind.gusts.in.delay.min}
            onChange={(event) =>
              dispatch(
                setWindGustsInDelayMin({
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
            tooltip="The maximum delay, in ms, before the wind begins to gust"
            showOutput={true}
            reset={() => {
              const max =
                index < DEFAULT_LAYERS.length
                  ? DEFAULT_LAYERS[index].wind.gusts.in.delay.max
                  : DEFAULT_WIND_IN_DELAY_MAX;
              dispatch(
                setWindGustsInDelayMax({
                  index,
                  max,
                })
              );
            }}
            value={layer.wind.gusts.in.delay.max}
            onChange={(event) =>
              dispatch(
                setWindGustsInDelayMax({
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
