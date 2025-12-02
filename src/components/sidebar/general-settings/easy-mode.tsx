import {
  DEFAULT_DENSITY,
  DEFAULT_WIND_GUSTS_ACTIVE,
  DEFAULT_MASS_MIN,
  DEFAULT_MASS_MAX,
  DEFAULT_WIND_STRENGTH,
  DEFAULT_WIND_GUSTS_CHANGE_CHANCE,
} from "@erikwatson/snowfall";
import { CheckBox } from "../../checkbox/checkbox";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Group } from "../../group/group";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Range } from "../../range/range";

import {
  setWindGustsActive,
  setDensity,
  setMassMax,
  setMassMin,
  setWindStrength,
  setWindGustsChangeChance,
} from "../../../features/config/config.slice";

export const EasyMode = () => {
  const dispatch = useDispatch();
  const [_density, _setDensity] = useState(DEFAULT_DENSITY * 2);

  useEffect(() => {
    dispatch(setDensity({ density: Math.round(_density / 2) }));
  }, [_density]);

  const [_gusts, _setGusts] = useState(DEFAULT_WIND_GUSTS_ACTIVE);

  useEffect(() => {
    dispatch(setWindGustsActive({ active: _gusts }));
  }, [_gusts]);

  const [_massMax, _setMassMax] = useState(DEFAULT_MASS_MAX);
  const [_massMin, _setMassMin] = useState(DEFAULT_MASS_MIN);

  useEffect(() => {
    dispatch(
      setMassMax({
        max: _massMax,
      })
    );
  }, [_massMax]);

  useEffect(() => {
    dispatch(
      setMassMin({
        min: _massMin,
      })
    );
  }, [_massMin]);

  // set the max to the min if the min is greater than the max
  useEffect(() => {
    if (_massMax < _massMin) {
      _setMassMax(_massMin);
    }
  }, [_massMin]);

  // set the min to the max if the max is less than the min
  useEffect(() => {
    if (_massMin > _massMax) {
      _setMassMin(_massMax);
    }
  }, [_massMax]);

  const [strength, setStrength] = useState(DEFAULT_WIND_STRENGTH);

  useEffect(() => {
    dispatch(setWindStrength({ strength }));
  }, [strength]);

  const [_changeChance, _setChangeChance] = useState(
    DEFAULT_WIND_GUSTS_CHANGE_CHANCE
  );

  useEffect(() => {
    dispatch(setWindGustsChangeChance({ chance: _changeChance }));
  }, [_changeChance]);

  return (
    <Group name="Easy mode" colour="grey-2" open={true}>
      {/* <Group name="Global settings" colour="grey-3"> */}
      <ControlGroup>
        <Control
          name="Density"
          value={_density}
          onChange={(event) => _setDensity(parseInt(event.target.value))}
          reset={() => _setDensity(DEFAULT_DENSITY * 2)}
          showOutput={true}
          tooltip="The amount of snowflakes, relative to a 1920x1080 screen"
        >
          <Range min={1} max={DEFAULT_DENSITY * 4} step={1} />
        </Control>

        <Control
          name="Gusts"
          value={_gusts}
          onChange={(event) => _setGusts(event.target.checked)}
          reset={() => _setGusts(DEFAULT_WIND_GUSTS_ACTIVE)}
          tooltip="Should the wind gust, or not?"
        >
          <CheckBox />
        </Control>

        <Control
          name="Mass - Minimum"
          tooltip="The minimum mass of the snowflakes"
          showOutput={true}
          reset={() => {
            _setMassMin(DEFAULT_MASS_MIN);
          }}
          value={_massMin}
          onChange={(event) => _setMassMin(event.target.valueAsNumber)}
        >
          <Range min="0" max="10" step="1" />
        </Control>

        <Control
          name="Mass - Maximum"
          tooltip="The maximum mass of the snowflakes"
          showOutput={true}
          reset={() => {
            _setMassMax(DEFAULT_MASS_MAX);
          }}
          value={_massMax}
          onChange={(event) => _setMassMax(event.target.valueAsNumber)}
        >
          <Range min="0" max="10" step="1" />
        </Control>

        <Control
          name="Strength"
          tooltip="The strength of the wind"
          showOutput={true}
          reset={() => {
            setStrength(DEFAULT_WIND_STRENGTH);
          }}
          value={strength}
          onChange={(event) => setStrength(event.target.valueAsNumber)}
        >
          <Range min="0" max="10" step="1" />
        </Control>

        <Control
          name="Change chance"
          tooltip="The chance that the wind gusts will change direction when it completes a cycle"
          showOutput={true}
          reset={() => {
            _setChangeChance(DEFAULT_WIND_GUSTS_CHANGE_CHANCE);
          }}
          value={Math.round(_changeChance * 100)}
          onChange={(event) =>
            _setChangeChance(Number(event.target.value) / 100)
          }
        >
          <Range min={0} max={100} step={1} />
        </Control>
      </ControlGroup>
      {/* </Group> */}
    </Group>
  );
};
