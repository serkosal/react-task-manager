import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props : {id:number, children?: React.ReactElement | string}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button className="Dragable" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}