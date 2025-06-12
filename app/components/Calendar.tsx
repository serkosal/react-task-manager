/**
 * @file Calendar.tsx
 * @description This file contains Calendar component
 *  
 * 
 * @module components/Calendar
*/

import { useState, useContext } from 'react';
import Lcalendar  from 'react-calendar';
import { type TileArgs } from 'react-calendar/src/index.js';
import 'react-calendar/dist/Calendar.css';

import TaskList, {TasksContext} from "./tasks/TaskList"
import { type IFilters} from './tasks/task_filtration';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar()
{
    /*
        TODO

        Create map: day -> list<Task>
        For ability to show num of tasks per day
        use property `tileContent` from Lcalendar
    */

    const [date, setDate] = useState<Value>(new Date());
    const tasks = useContext(TasksContext);
    const [filters, setFilters] = useState<IFilters>({deadline_from_date: new Date()});


    function onChangeDay(value: Value, _event: React.MouseEvent<HTMLButtonElement>) {
        if (value instanceof Date)
        {
            const to_date = new Date(+value + 24*3600*1000);
            setFilters({deadline_from_date: value, deadline_to_date: to_date});
            console.log("from:", value, "to:", to_date);
        }
    }

    function tileContent({date} : TileArgs ) {

        const to_date = new Date(+date + 24*3600*1000);

        const num = tasks.reduce(
            (count, task) => (task.deadline >= date && task.deadline <= to_date) 
                ? count + 1 : count, 0
        );


        return num ? <p> <b>{num}</b></p>: undefined;
    }



    return <>
        <Lcalendar tileContent={tileContent} onChange={setDate} value={date} onClickDay={onChangeDay}/>

        <TaskList filters={filters} />
    </>;
}

