import { ChangeEvent } from "react";
import { Button } from "../button/button";
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type Range2Props = {
  value?: { from: number, to: number };
  onChange?: (value: { from: number, to: number }) => void;
  min: number | string;
  max: number | string;
  step: number | string;
};

export const Range2 = ({ value, onChange, min, max, step }: Range2Props) => {
  const valueArray = (value) ? [value.from, value.to] : [0, 1];

  return (
    <>
      {/* <input
        type="range"
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(event) => (onChange) ? onChange(event) : null}
        min={min}
        max={max}
        step={step}
      /> */}
      {/* <Slider /> */}
      <RangeSlider min={min} max={max} step={step} value={valueArray} onInput={(v: number[]) => ({ from: v[0], to: v[1] })} />
    </>
  );
};
