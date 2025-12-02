import { ChangeEvent } from "react";

type TextProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Text = ({ value, onChange }: TextProps) => {
  return (
    <>
      <input
        type="text"
        className="border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(event) => (onChange) ? onChange(event) : null}
      ></input>
    </>
  );
};
