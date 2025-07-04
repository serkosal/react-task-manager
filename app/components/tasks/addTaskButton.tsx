/**
 * @file addTaskButton.tsx
 * @description Renders a button for adding new task to the TaskList. It requires provided {@link TasksDispatchContext}.
 * 
 * @module components/addTaskButton
 */

import React, { useContext } from "react";
import { createTask, type CreateTaskInput } from "./task";
import { TasksDispatchContext } from "./TaskList";

// 📌 Import for documentation only
import { type ITasksReducerAction } from "./TaskList"; 

/**
 * AddTask react component - renders a button that adds a task to the task list.
 * It uses the {@link TasksDispatchContext} to dispatch an {@link ITasksReducerAction | "add" reducer action }. 
 * @param props - optional default task prop 
 * @returns React button component to create a task.
 */
export default function AddTaskButton(
    new_task: CreateTaskInput = {tags:["New"]}
    ): React.ReactNode {
    "use no memo";

    const dispatcher = useContext(TasksDispatchContext);

    return <button className="add-task-button" onClick={buttonClick}>
        + Create new task +
    </button>


    /**
     * Handles the click event on the add task button.
     * It uses dispatcher from {@link TasksDispatchContext}.
     */
    function buttonClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (dispatcher)
            dispatcher({
                type: "add",
                new_task: createTask(new_task)
            })
    }
}