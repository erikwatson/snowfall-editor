import { PropsWithChildren, useState } from "react";

import './group.css';
import { Button } from "../button/button";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type GroupProps = PropsWithChildren<{
  name: string;
  open?: boolean;
  colour: 'primary' | 'secondary' | 'white' | 'grey-1' | 'grey-2' | 'grey-3' | 'grey-4' | 'grey-5';
}>;

export const Group = ({ children, name, colour, open }: GroupProps) => {
  let [closed, setClosed] = useState(!open || false);
  const className = `group ${colour}`;

  return (
    <div className={className}>
      <div className={'groupHeader'} onClick={() => setClosed(!closed)}>
        {/* <Button kind="transparent" onClick={() => setClosed(!closed)} tooltip={closed ? "Open" : "Close"}>
          <FontAwesomeIcon icon={closed ? faChevronRight : faChevronDown} />
        </Button> */}
        <h2>{name}</h2>
      </div>
      <div className={closed ? 'groups closed' : 'groups'}>{children}</div>
    </div>
  );
}