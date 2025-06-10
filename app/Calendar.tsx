import { useState } from 'react';
import Lcalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { type ReactElement } from "react"

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar({children} : {children?: ReactElement})
{
    const [date, setDate] = useState<Value>(new Date());

    function onChangeDay(value: Value, _event: React.MouseEvent<HTMLButtonElement>) {
        console.log("usser pressed", value);
    }

    return (
        <div>
            <Lcalendar onChange={setDate} value={date} onClickDay={onChangeDay}/>
            {children}
        </div>
    );
} 