import { SortableItem } from "../dndkit/SortableItem";
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';

import Task, {createTask} from "./task";
import type { ITask } from "./task";
import { type IFilters, filter_tasks } from "./task_filtration"
import { createContext, useContext, type Dispatch } from "react";


export const defaultTasks: ITask[] = [
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

    let init_tasks: ITask[];

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
        new_tasks: ITask[];
    } | {
        type: "add";
        new_task: ITask;
    } | {
        type: "change";
        task_id: string;
        new_task: ITask;
    } | {
        type: "delete";
        task_id: string;
    }
);

export function tasksReducer(tasks: ITask[], action: ITasksReducerAction):ITask[] 
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

export const TasksContext = createContext(Array<ITask>());
export const TasksDispatchContext = createContext<Dispatch<ITasksReducerAction> | null>(null);

export default function TaskList(
    {filters} : {
        filters?: IFilters
    }) {

    const tasksDispatcher = useContext(TasksDispatchContext);
    const tasks = useContext(TasksContext);
    const filtered_tasks = filter_tasks(tasks, filters)

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
                            />
                    </SortableItem>
            )}
            </DragDropProvider>
    </div>)

    
}