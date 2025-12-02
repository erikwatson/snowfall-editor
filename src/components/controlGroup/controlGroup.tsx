import { PropsWithChildren } from "react";
import './controlGroup.css';
type ControlGroupProps = PropsWithChildren<{}>;

export const ControlGroup = ({ children }: ControlGroupProps) => {
  return (
    <div className="control-group">
      {children}
    </div>
  );
}