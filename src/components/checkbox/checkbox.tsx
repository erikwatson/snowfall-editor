import { ChangeEvent } from "react";
import { Button } from "../button/button";

type CheckboxProps = {
  value?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox = ({ value, onChange }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" checked={value} onChange={onChange} />
    </>
  );
};
