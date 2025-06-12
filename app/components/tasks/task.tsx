import "./task.css"
import { TasksContext, TasksDispatchContext, type ITasksReducerAction } from "./TaskList";

/* https://www.flaticon.com/free-icon/bin_484662 */
import trashBinLogo from "@/assets/bin.png"

import {useContext, type ChangeEvent} from "react";

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

function get_random_color() {
    const TASK_COLORS = [
        '#356ca6', '#35a673', '#7ca635', "#6635a6",
        '#823b71', '#3f4d4b', '#b57131', '#a84343'
    ];

    return TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)];
}

type CreateTaskInput = Partial<Omit<ITask, 'id' | 'creation_date'>>;
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

export function handle_edit_task() {

}


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

function updateTask(new_task: ITask, dispatcher: React.Dispatch<ITasksReducerAction> | null): void
{
    if (dispatcher)
        dispatcher({
            type: "change", 
            task_id: new_task.id, 
            new_task: new_task
        })
}

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

function TaskCreator({task}: {task: ITask}) {

    return <div className="task-creator">
        Created by: <a href="">{task.creator}</a>
    </div>
}

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

function TaskCreationDate({task}: {
    task: ITask,
    children?: React.ReactNode, 
    }) {
    return  <div className="task-creation-date">
        {DateTodateTimeLocalNow(task.creation_date)}
    </div>
}

function DateTodateTimeLocalNow(date: Date): string {
    return  new Date(
        date.getTime() - date.getTimezoneOffset() * 60_000
        ).toISOString().slice(0, 16);
}

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

function TaskFooter({children}: {
    children?: React.ReactNode, 
    }) {

    return <div className="task-footer">{children}</div>
}


function TaskPriority({task}: {task: ITask}) {

    return <div className="task-priority">
        priority {task.priority}
    </div>
}

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