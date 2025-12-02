import { ChangeEvent } from "react";
import { Button } from "../button/button";

type RangeProps = {
  value?: number | string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  min: number | string;
  max: number | string;
  step: number | string;
};

export const Range = ({ value, onChange, min, max, step }: RangeProps) => {
  return (
    <>
      <input
        type="range"
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(event) => (onChange) ? onChange(event) : null}
        min={min}
        max={max}
        step={step}
      />
    </>
  );
};
