import React, { useContext } from "react";
import { createTask } from "./task";
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
    {new_task = createTask({tags:["New"]})}
    ): React.ReactNode {

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
                new_task: new_task
            })
    }
}