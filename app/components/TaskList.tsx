import { SortableItem } from "./SortableItem"
import Task from "./task";
import type { ITaskProps } from "./task";

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
  rectSortingStrategy,
} from '@dnd-kit/sortable';



export default function TaskList(
    {tasks, setTasks} : {
        tasks: ITaskProps[], 
        setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
            <SortableContext 
                items={tasks}
                strategy={rectSortingStrategy}
            >
                {tasks.map(task => {
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

    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
        setTasks((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            
            return arrayMove(items, oldIndex, newIndex);
        });
        }
    }
}