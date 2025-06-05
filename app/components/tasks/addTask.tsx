import { useContext } from "react";
import { createTask } from "./task";
import { TasksDispatchContext } from "./TaskList";

export default function AddTask({new_task = createTask({tags:["New"]})}) {

    const dispatcher = useContext(TasksDispatchContext);

    return <button className="add-task-button" onClick={buttonClick}>
        + Create new task +
    </button>

    function buttonClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (dispatcher)
            dispatcher({
                type: "add",
                new_task: new_task
            })
    }
}