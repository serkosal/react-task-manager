/**
 * @file task.tsx
 * @description This file contains render components for tasks and helper functions.
 * 
 * @module components/tasks/task
*/

import "./task.css"
import { TasksContext, TasksDispatchContext, type ITasksReducerAction } from "./TaskList";

/* https://www.flaticon.com/free-icon/bin_484662 */
import trashBinLogo from "@/assets/bin.png"

import {useContext, type ChangeEvent} from "react";

/**
 * interface for Task objects
 */
type TaskTag = string;
export interface ITask {
    id: string,
    color: string,
    title: string,                      // add task start time
    description: string,

    creator: string,
    responsibles?: number[],

    creation_date: Date,
    is_done: boolean,               // done_date if null means not done yet
    deadline: Date,                     // 
    timedelta_seconds: number           // repeat time

    priority: number,
    tags: TaskTag[]
}

/**
 * helper function
 * @returns random color from inner const list.
 * Colors in hex format #rrggbb. Expected that colors are valid css value.
 */
function get_random_color():string {
    const TASK_COLORS = [
        '#356ca6', '#35a673', '#7ca635', "#6635a6",
        '#823b71', '#3f4d4b', '#b57131', '#a84343'
    ];

    return TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)];
}

type CreateTaskInput = Partial<Omit<ITask, 'id' | 'creation_date'>>;
/**
 * helper function for task creation
 * @returns new task from provided properties
 */
export function createTask(
    {
        title = "",
        description = "",
        priority = 5,
        deadline = (new Date(Date.now() + 24*3600*1000)),

        creator = "Anonymous",
        is_done = false,
        responsibles = [],
        timedelta_seconds = Infinity,
        tags = [],
        // color = 
    }: CreateTaskInput = {}
): ITask {
    return {
        id: crypto.randomUUID(),        

        title,
        description,
        priority,
        deadline,
        is_done,

        creator,
        creation_date: new Date(),
        responsibles,

        timedelta_seconds,
        tags,
        color: get_random_color(),
    };
}

// export function handle_edit_task() {

// }


/**
 * helper function to transform hex colors to rgba format.
 * @returns string in format 'rgba(r, g, b, a) to be used as a css value.
 */
function hexToRGBA(hex: string, alpha: number): string {
  // Remove the "#" if present
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * handles 'change' dispatch action.
 */
function updateTask(new_task: ITask, dispatcher: React.Dispatch<ITasksReducerAction> | null): void
{
    if (dispatcher)
        dispatcher({
            type: "change", 
            task_id: new_task.id, 
            new_task: new_task
        })
}

/**
 * renders task's header react component.
 */
function TaskHeader({children, task}: {
    task: ITask,
    children?: React.ReactNode, 
    }) {

    const dispatcher = useContext(TasksDispatchContext);
    const tasks = useContext(TasksContext);

    function titleOnChange(ev: ChangeEvent<HTMLInputElement>) {
        updateTask({...task, title: ev.target.value}, dispatcher);        
    };

    function checkBoxOnChange(ev: ChangeEvent<HTMLInputElement>) {
        updateTask({...task, is_done: ev.target.checked}, dispatcher); 
    }

    function onTaskDeleteClick(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        const index = tasks.findIndex(item => item.id === task.id);

        if (dispatcher)
            dispatcher({
                type: "replace", 
                new_tasks: tasks.slice(0, index).concat(tasks.slice(index+1))
            })

    }

    const style = {
        backgroundColor: hexToRGBA(task.color, 0.6),
        backdropFilter: "1px"
    }

    return <div className="task-header" style={style}>
        <div className='task-header-main'>
            <input 
                type="checkbox" 
                name='task-done-checkbox'
                value='task-done-checkbox'
                checked={task.is_done}
                onChange={checkBoxOnChange}
            />
            <input 
                type="text" 
                className="task-title-text-input"
                placeholder="task title..."
                value={task.title} 
                onChange={titleOnChange}
                
                // space don't work because of 
                // dndkit captures control
                onKeyDown={(e) => e.stopPropagation()}  
            />

            <button className="task-delete-button" onClick={onTaskDeleteClick}>
                <img className="task-delete-img" src={trashBinLogo} alt="delete"></img>
            </button>
        </div>
        
        <div className="task-header-children">
            {children}
        </div>
    </div>
}

// function TaskBody({id, tasks, setTasks}: {
//     id: string,
//     tasks: ITaskProps[],
//     setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
//     }) {}

/**
 * renders task's description react component.
 */
function TaskDescription({children, task}: {
    task: ITask,
    children?: React.ReactNode, 
    }) {

    const dispatcher = useContext(TasksDispatchContext);

    function descrOnChange(event: ChangeEvent<HTMLTextAreaElement>) {

        updateTask({...task, description: event.target.value}, dispatcher);

        if (event.target.scrollHeight < 150)
        {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        }  
    };

    return <div className="task-description">
        

        <textarea 
            className="task-description-text-input"
            value={task.description}
            placeholder="task description..."
            onInput={descrOnChange} 
            onKeyDown={(e) => e.stopPropagation()}
        />
        {children}
        <hr/>
        
    </div>
}

/**
 * renders task's creator react component.
 */
function TaskCreator({task}: {task: ITask}) {

    return <div className="task-creator">
        Created by: <a href="">{task.creator}</a>
    </div>
}

/**
 * renders task's color picker react component.
 */
function TaskColorPicker({task}: {
    task: ITask,
    }) {

    const dispatcher = useContext(TasksDispatchContext);

    return <input 
        type="color"
        // id={`task-color-picker-${id}`}
        className="task-color-picker"
        name='task-color-picker'
        value={task.color}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateTask({...task, color: event.target.value}, dispatcher);
        }}
    />
}

/**
 * renders task's creation date react component.
 */
function TaskCreationDate({task}: {
    task: ITask,
    children?: React.ReactNode, 
    }) {
    return  <div className="task-creation-date">
        {DateTodateTimeLocalNow(task.creation_date)}
    </div>
}


/**
 * helper function to transform date to local format.
 */
function DateTodateTimeLocalNow(date: Date): string {
    return  new Date(
        date.getTime() - date.getTimezoneOffset() * 60_000
        ).toISOString().slice(0, 16);
}


/**
 * renders task's deadline date react component.
 */
function TaskDeadlineDate({task}: {task: ITask}) {

    const dispatcher = useContext(TasksDispatchContext);

    return <input 
        type="datetime-local" 
        className="task-deadline-date"
        value={DateTodateTimeLocalNow(task.deadline)}
        onChange={(event) => {
            try {
                const new_deadline = new Date(event.target.value);

                updateTask({...task, deadline: new_deadline}, dispatcher);
            }
            catch (e: unknown) {
                console.log(e);
            }
            
        }}
    />
}

/**
 * renders task's footer react component.
 */
function TaskFooter({children}: {
    children?: React.ReactNode, 
    }) {

    return <div className="task-footer">{children}</div>
}


/**
 * renders task's priority react component.
 */
function TaskPriority({task}: {task: ITask}) {

    return <div className="task-priority">
        priority {task.priority}
    </div>
}

/**
 * renders task's repetion react component.
 */
function TaskRepetion({task}: {
    task: ITask,
    children?: React.ReactNode, 
    }) {

    if (task.timedelta_seconds === +Infinity) return;

    const timedelta = new Date(task.timedelta_seconds);

    return (Number.isFinite(timedelta)  ? <div className="task-repetition">
        repeat: {DateTodateTimeLocalNow(timedelta)}
    </div> : undefined)
}

/**
 * renders task react component.
 */
export default function Task(props : {
    task: ITask 
}) {
    // let responsibles: React.ReactNode[];
    
    // if (props.responsibles) {
    //     responsibles = props.responsibles.map(el => <div className="Responsible">{el}</div>)
    // }

    return <div className="task">
        
        <TaskHeader {...props}>
            <TaskCreator {...props} />
            <TaskCreationDate {...props} />
            <TaskDeadlineDate {...props} />
            <TaskColorPicker {...props} />
        </TaskHeader>
        

        <TaskDescription {...props}/>

        <TaskFooter>
            <TaskRepetion {...props} />
            <TaskPriority {...props} />
            <div className="task-tags" >
                {props.task.tags.map((el, ind) => <a className="task-tag" key={ind} href="">{el} </a>)}
            </div>
        </TaskFooter>
        
    </div>;
}