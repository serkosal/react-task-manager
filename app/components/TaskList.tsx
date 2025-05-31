import { SortableItem } from "./SortableItem";
import Task from "./task";
import type { ITaskProps } from "./task";


export default function TaskList(
    {tasks, setTasks} : {
        tasks: ITaskProps[], 
        setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

    const filtered_tasks = tasks.filter(task => !task.is_done);

    

    return <>{
        filtered_tasks.map(
            (task, index) => <SortableItem key={task.id} id={task.id} index={index}>
                    <Task 
                        key={task.id} 
                        id={task.id} 
                        tasks={tasks} 
                        setTasks={setTasks}
                    />
            </SortableItem>
    )}</>

    
}