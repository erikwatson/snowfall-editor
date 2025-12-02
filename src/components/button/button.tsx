import { MouseEvent, PropsWithChildren } from "react";
import { Tooltip } from "react-tooltip";

type ButtonProps = PropsWithChildren<{
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  kind?: "normal" | "warn" | "error" | "transparent";
  tooltip?: string;
  disabled?: boolean
}>;

export const Button = ({ onClick, kind, children, tooltip, disabled }: ButtonProps) => {
  const styles = {
    normal:
      "min-w-[75px] h-9 bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 border border-slate-700 rounded",
    warn: "w-9 h-9 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-700 rounded",
    error:
      "w-9 h-9 bg-red-700 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-700 rounded",
      transparent: "w-9 h-9 bg-transparent hover:bg-slate-100 font-bold py-1 px-2 rounded",
      // disabled: "opacity-50 cursor-not-allowed",
      disabled: "w-9 h-9 bg-slate-500 text-gray-400 font-bold py-1 px-2 border border-slate-700 rounded opacity-50 cursor-not-allowed hover:bg-slate-500"
    };
  const style = (disabled) 
    ? styles['disabled'] 
    : kind 
      ? styles[kind] 
      : styles.normal;

  const id = Math.random().toString();

  return (
    <>
      {/* show only if tooltip is set */}
      {tooltip && (
        <>
          <Tooltip id={id} />
          <button
            onClick={onClick}
            className={style}
            data-tooltip-id={id}
            data-tooltip-place="top"
            data-tooltip-content={tooltip}
            disabled={disabled}
          >
            {children}
          </button>
        </>
      )}

      {/* show only if tooltip is not set */}
      {!tooltip && (
        <button onClick={onClick} className={style}>
          {children}
        </button>
      )}
    </>
  );
};
