import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from "~/components/SortableItem";
import { ClientOnly } from "~/components/ClientOnly";
import Task, { defaultTasks } from "~/components/task";
import type {ITaskProps} from "~/components/task";

import "./home.css"

export function meta({}: Route.MetaArgs) {
return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
];
}



export default function Home() { 

    const [items, setItems] = useState<ITaskProps[]>(defaultTasks);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return <ClientOnly>
        <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
            <SortableContext 
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(task => {
                    return (<SortableItem 
                            key={task.id} 
                            id={task.id}
                            >
                                <Task key={task.id} {...task} />
                            </SortableItem>
                    );
                    }
                )}
            </SortableContext>
        </DndContext>
    </ClientOnly>
    
    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
        setItems((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            
            return arrayMove(items, oldIndex, newIndex);
        });
        }
    }

}
