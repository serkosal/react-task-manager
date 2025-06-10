import AddTask from "./components/tasks/addTask"
import TaskList, {from_local_storage, tasksReducer, TasksDispatchContext} from "./components/tasks/TaskList"
import Filters from "./components/Filters"
import type { IFilters } from "./components/tasks/task_filtration"

import { useEffect, useReducer, useState } from 'react'

export default function MainContainer() {

    const [isUnsaved, setIsUnsaved] = useState(false);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, from_local_storage());
    const [filters, setFilters] = useState<IFilters>({hide_done: false});

    useEffect(() => {
        setIsUnsaved(true);
    }, [tasks]);

    return <div className="main-container">

        <Filters filters={filters} setFilters={setFilters}/>

            <TasksDispatchContext value={dispatchTasks}>
            <AddTask/>

            <button onClick={() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
                setIsUnsaved(false);
            }} disabled={!isUnsaved}>
                Save to the local storage
            </button>


            <TaskList tasks={tasks} filters={filters} />

            </TasksDispatchContext>
    </div>
}