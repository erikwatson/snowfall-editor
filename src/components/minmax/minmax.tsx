import { ChangeEvent, useState } from "react";
import { Range } from "../range/range";

import './minmax.css';
import { Control } from "../control/control";

type MinMaxProps = {
  value?: { min?: number, max?: number };
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  step: number;
};

export const MinMax = ({ value, onChange, step }: MinMaxProps) => {
  return <div className="minmax">
    <Control name="Min" reset={() => null} value={value?.min || 0} onChange={onChange}>
      <Range
        min={0}
        max={1000}
        step={step}
      />
    </Control>
    
    <Control name="Max" reset={() => null} value={value?.max || 0} onChange={onChange}>
      <Range
        min={0}
        max={1000}
        step={step}
      />
    </Control>
  </div>
}