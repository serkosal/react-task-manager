import type { ITaskProps } from "./task";
import { createTask } from "./task";
import type { Dispatch, SetStateAction } from "react";

export default function AddTask({setTasks} : {
    setTasks: Dispatch<SetStateAction<ITaskProps[]>>
}) {

    return <button onClick={buttonClick}>
        + Create new task +
    </button>

    function buttonClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setTasks(prev => {
            return [
                createTask({tags:["New"]}),
                ...prev,
            ]
        })
    }
}