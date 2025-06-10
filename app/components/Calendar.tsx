import { useState } from 'react';
import Lcalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import TaskList from "./tasks/TaskList"
import { type IFilters } from './tasks/task_filtration';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar()
{
    const [date, setDate] = useState<Value>(new Date());
    const [filters, setFilters] = useState<IFilters>({deadline_from_date: new Date()});


    function onChangeDay(value: Value, _event: React.MouseEvent<HTMLButtonElement>) {
        if (value instanceof Date)
        {
            const to_date = new Date(+value + 24*3600*1000);
            setFilters({deadline_from_date: value, deadline_to_date: to_date});
            console.log("from:", value, "to:", to_date);
        }
    }

    return <>
        <Lcalendar onChange={setDate} value={date} onClickDay={onChangeDay}/>

        <TaskList filters={filters} />
    </>;
} 