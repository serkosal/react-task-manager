import { useState, useEffect, useContext } from "react";

import AddTask from "./tasks/addTaskButton"
import TaskList, {TasksContext} from "./tasks/TaskList"

import { type IFilters } from "./tasks/task_filtration"
import Filters from "./Filters"

export default function MainTasksView() {

    const [isUnsaved, setIsUnsaved] = useState(false);
    const [filters, setFilters] = useState<IFilters>({hide_done: false});
    const tasks = useContext(TasksContext);

    useEffect(() => {
            setIsUnsaved(true);
    }, [tasks]);
    

    return (
        <>
            <Filters filters={filters} setFilters={setFilters}/>
            <AddTask/>

            <button onClick={() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
                setIsUnsaved(false);
            }} disabled={!isUnsaved}>
                Save to the local storage
            </button>

            <TaskList filters={filters} />
        </>
    )
}