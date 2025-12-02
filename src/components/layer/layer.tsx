import { MouseEvent, PropsWithChildren, useState } from "react";

import "./layer.css";
import { Button } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons/faUndo";
import {
  faBars,
  faC,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faCircle,
  faClone,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { moveLayerUp, moveLayerDown } from '../../features/config/config.slice'

type LayerProps = PropsWithChildren<{
  id: number;
  name: string;
  size: number;
  remove: () => void;
  duplicate: () => void;
  reset: () => void;
  layerUp: () => void;
  layerDown: () => void;
  mode: "simple" | "image";
  colour: 'primary' | 'secondary' | 'white' | 'grey-1' | 'grey-2' | 'grey-3' | 'grey-4' | 'grey-5';
}>;

export const Layer = ({
  id, // this is also the index 
  children,
  name,
  remove,
  duplicate,
  reset,
  layerUp, 
  layerDown,
  colour,
  size,
  mode
}: LayerProps) => {
  let [closed, setClosed] = useState(true);

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const className = `layer ${colour}`;

  const dispatch = useDispatch();

  return (
    <div
      className={className}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className={closed ? 'layerBar closed' : 'layerBar'} onClick={() => setClosed(!closed)}>
        <div className="layerType" >
          {(mode === 'simple') && <FontAwesomeIcon icon={faCircle} />}
          {(mode === 'image') && <FontAwesomeIcon icon={faImage} />}
        </div>
        <h4>{name}</h4>
        <div className="controls">
          {(id !== 0) && <Button kind="transparent" onClick={(event) => {
            event.stopPropagation();
            layerUp();
          }}
          tooltip={"Move up"}>
            <FontAwesomeIcon icon={faChevronUp}  style={{ color: '#64748b' }} />
          </Button>}
          
          {(id < size) && <Button kind="transparent" onClick={(event) => {
            event.stopPropagation();
            layerDown();
          }} tooltip={"Move down"}>
            <FontAwesomeIcon icon={faChevronDown}  style={{ color: '#64748b' }} />
          </Button>}

          <Button onClick={() => duplicate()} kind="transparent" tooltip="Duplicate">
            <FontAwesomeIcon icon={faClone} style={{ color: '#64748b' }} />
          </Button>
          <Button kind="transparent" onClick={() => reset()} tooltip={(mode === 'simple') ? "Reset to default simple layer" : "Reset to default image layer"}>
            <FontAwesomeIcon icon={faUndo} style={{ color: '#b91c1c' }} />
          </Button>
          <Button kind="transparent" onClick={() => remove()} tooltip="Remove">
            <FontAwesomeIcon icon={faTrash} style={{ color: '#b91c1c' }} />
          </Button>
        </div>
      </div>

      <div className={closed ? "layers closed" : "layers"}>{children}</div>
    </div>
  );
};
