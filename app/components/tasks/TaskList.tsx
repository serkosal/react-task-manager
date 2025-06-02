import { SortableItem } from "../dndkit/SortableItem";
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';

import Task from "./task";
import type { ITaskProps } from "./task";
import type { IFilters } from "./task_filtration"

export default function TaskList(
    {tasks, setTasks, filters} : {
        tasks: ITaskProps[], 
        setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>,
        filters: IFilters
    }) {

    const filtered_tasks = filters.hide_done ? 
        tasks.filter(task => !task.is_done) : tasks;

    return (
        <DragDropProvider 
            onDragEnd={(event) => {
                if (event.canceled) return;

                setTasks((prev) => move(prev, event));
            }}
        >
            {
                filtered_tasks.map((task, index) => 
                    <SortableItem key={task.id} id={task.id} index={index}>
                            <Task 
                                key={task.id} 
                                id={task.id} 
                                tasks={tasks} 
                                setTasks={setTasks}
                            />
                    </SortableItem>
                )
            }
    </DragDropProvider>)

    
}