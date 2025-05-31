// import { SortableItem } from "./SortableItem"
import Task from "./task";
import type { ITaskProps } from "./task";

// import {
//     DndContext, 
//     closestCenter,
//     KeyboardSensor,
//     PointerSensor,
//     useSensor,
//     useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   rectSortingStrategy,
// } from '@dnd-kit/sortable';



export default function TaskList(
    {tasks, setTasks} : {
        tasks: ITaskProps[], 
        setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

    // const sensors = useSensors(
    //     useSensor(PointerSensor),
    //     useSensor(KeyboardSensor, {
    //     coordinateGetter: sortableKeyboardCoordinates,
    //     })
    // );

    // function handleDragEnd(event: any) {
    //     const {active, over} = event;
        
    //     if (active.id !== over.id) {
    //     setTasks((items) => {
    //         const oldIndex = items.findIndex(item => item.id === active.id);
    //         const newIndex = items.findIndex(item => item.id === over.id);
            
    //         return arrayMove(items, oldIndex, newIndex);
    //     });
    //     }
    // }

    const filtered_tasks = tasks.filter(task => !task.is_done);

    // return <DndContext 
    //     sensors={sensors}
    //     collisionDetection={closestCenter}
    //     onDragEnd={handleDragEnd}
    //     >
            {/* <SortableContext 
                items={tasks.map(task => task.id)}
                strategy={rectSortingStrategy}
            > */}
                return <>{filtered_tasks
                    .map(task => {
                    return <Task key={task.id} id={task.id} tasks={tasks} setTasks={setTasks}/>
                        // <SortableItem 
                        //     key={task.id} 
                        //     id={task.id}>
                        //     <Task id={task.id} tasks={tasks} setTasks={setTasks}/>
                                
                        // </SortableItem>);
                    }
                )}</>
            {/* </SortableContext> */}
    {/* </DndContext> */}

    
}