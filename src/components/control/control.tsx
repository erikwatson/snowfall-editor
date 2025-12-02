import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import "./control.css";
import { Button } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { layerReducer } from "../../features/config/layer/layer.slice";

type ControlProps = {
  name: string;
  reset: () => void;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactElement<{
    value?: any;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | ((value: any) => void);
    reset?: () => void;
  }>;
  showOutput?: boolean;
  tooltip?: string;
};

export const Control = ({
  name,
  children,
  reset,
  value,
  onChange,
  showOutput,
  tooltip,
}: ControlProps) => {
  const [v, setV] = useState(value);
  const isPrimitive = value == null || ['string', 'number', 'boolean'].includes(typeof value);
  const [displayValue, setDisplayValue] = useState(isPrimitive ? String(value) : JSON.stringify(value));

  useEffect(() => {
    setV(value);
    setDisplayValue(isPrimitive ? String(value) : JSON.stringify(value));
  }, [value, isPrimitive]); // Recompute on value change

  console.log({ value, v });

  return (
    <div className="control-wrapper">
      <div className="control">
        <div className="children">
          <div className="label-row">
            <label>{name}:</label>
            {value && onChange && showOutput && (
              <input
                value={displayValue}
                onChange={(evt) => setDisplayValue(evt.target.value)}
                className="border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-2"
                type="text"
                onBlur={(evt) => {
                  try {
                    const parsedValue = isPrimitive ? displayValue : JSON.parse(displayValue);
                    // Fake a ChangeEvent with the parsed value for onChange
                    const fakeEvent = {
                      ...evt,
                      target: { ...evt.target, value: parsedValue },
                    } as ChangeEvent<HTMLInputElement>;
                    onChange(fakeEvent);
                  } catch (error) {
                    console.error('Invalid JSON:', error);
                    // Revert to original on error
                    setDisplayValue(isPrimitive ? String(value) : JSON.stringify(value));
                  }
                }}
              />
            )}
            {name === "Image" && value && (
              <div className="checkerboard">
                <img src={value} width={48} height={48} alt="Preview" style={{ display: "block" }} />
              </div>
            )}
          </div>
          <div className="input-row">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                if (name === "Image") {
                  return React.cloneElement(
                    child as React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>,
                    {
                      type: "file",
                      accept: "image/*",
                      onChange,
                    }
                  );
                } else {
                  return React.cloneElement(child, { value, onChange, reset });
                }
              }
              return child;
            })}
            <Button kind="transparent" onClick={reset} tooltip="Reset">
              <FontAwesomeIcon icon={faUndo} style={{ color: '#b91c1c' }} />
            </Button>
            {tooltip && (
              <Button kind="transparent" onClick={() => null} tooltip={tooltip}>
                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#64748b' }} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};