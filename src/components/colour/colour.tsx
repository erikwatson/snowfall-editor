import { ChangeEvent } from "react";
import { SketchPicker } from "react-color";

type ColourProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Colour = ({ value, onChange }: ColourProps) => {
  return (
    <input
      type="color"
      className=""
      value={value}
      onChange={(event) => (onChange) ? onChange(event) : null}
    />
    // <SketchPicker
    //   color={value}
    //   onChange={(color) =>
    //     onChange
    //       ? onChange({
    //           target: { value: color.hex },
    //         } as ChangeEvent<HTMLInputElement>)
    //       : null
    //   }
    // />
  );
};
