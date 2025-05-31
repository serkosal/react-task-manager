import type { ITaskProps } from "./task";
import { createTask } from "./task";
import type { Dispatch, SetStateAction } from "react";

export default function AddTask({tasks, setTasks} : {
    tasks: ITaskProps[],
    setTasks: Dispatch<SetStateAction<ITaskProps[]>>
}) {

    return <button onClick={buttonClick}>
        + Create new task +
    </button>

    function buttonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setTasks(prev => {
            return [
                createTask({tags:["New"]}),
                ...prev,
            ]
        })
    }
}