import { ChangeEvent, PropsWithChildren } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = PropsWithChildren<{
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}>;

export const Select = ({ value, onChange, children }: SelectProps) => {
  return (
    <>
      <select value={value} onChange={onChange} className="bg-white border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value={''}></option>
        {children}
      </select>
    </>
  );
};
