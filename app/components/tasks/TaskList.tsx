import { SortableItem } from "../dndkit/SortableItem";
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';

import Task, {createTask} from "./task";
import type { ITaskProps } from "./task";
import type { IFilters } from "./task_filtration"
import { createContext, useContext, type Dispatch } from "react";


export const defaultTasks: ITaskProps[] = [
    createTask({
        title: "Buy milk", 
        description: "Go to the shop and buy 1L of ultra-pasteurized milk."
    }),
    createTask({
        title: "Go to the cinema", 
        description: "Go to the cinema.",
        priority: 2
    }),
    createTask({
        title: "Water the flowers", 
        timedelta_seconds: 86400
    }),

]

export function from_local_storage(init = defaultTasks){

    let init_tasks: ITaskProps[];

    try {
    
        const stored = localStorage.getItem("tasks");
    
        init_tasks = stored ? 
    
            JSON.parse(stored, (_key, value) => {
    
    
                // Detect ISO date string and convert to Date
                if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
                    return new Date(value);
                }
                return value;
            })
    
        : init;
    
    } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
        init_tasks = init;
    }
    
    return init_tasks;
}

export type ITasksReducerAction = (
    {
        type: "replace";
        new_tasks: ITaskProps[];
    } | {
        type: "add";
        new_task: ITaskProps;
    } | {
        type: "change";
        task_id: string;
        new_task: ITaskProps;
    } | {
        type: "delete";
        task_id: string;
    }
);

export function tasksReducer(tasks: ITaskProps[], action: ITasksReducerAction):ITaskProps[] 
{
    switch (action.type) {
        case "add": {return [...tasks, action.new_task]; }
        case "change": {return tasks.map((task) => {
            if (task.id === action.task_id) return action.new_task;
            else return task;
        })}
        case "delete": {return tasks.filter(task => task.id !== action.task_id);}
        case "replace": { return action.new_tasks; }
        default: {
            return tasks; 
        }
    }
}

export const TasksContext = createContext(Array<ITaskProps>());
export const TasksDispatchContext = createContext<Dispatch<ITasksReducerAction> | null>(null);

export default function TaskList(
    {filters} : {
        filters?: IFilters
    }) {

    const tasks = useContext(TasksContext);
    const tasksDispatcher = useContext(TasksDispatchContext);

    const filtered_tasks = filters ? (filters.hide_done ? 
        tasks.filter(task => !task.is_done) : tasks) : tasks;

    return ( <div className="task-list">
        
            <DragDropProvider 
                onDragEnd={(event) => {
                    if (event.canceled || !tasksDispatcher) return;

                    tasksDispatcher({type: "replace", new_tasks: move(tasks, event)})
                }}
            >
            {filtered_tasks.map((task, index) => 
                    <SortableItem key={task.id} id={task.id} index={index}>
                            <Task 
                                key={task.id}
                                task={task}
                                // tasks={tasks} 
                                // setTasks={setTasks}
                            />
                    </SortableItem>
            )}
            </DragDropProvider>
    </div>)

    
}