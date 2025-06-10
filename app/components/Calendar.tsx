import { useState } from 'react';
import Lcalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar()
{
    const [date, setDate] = useState<Value>(new Date());

    function onChangeDay(value: Value, _event: React.MouseEvent<HTMLButtonElement>) {
        console.log("usser pressed", value);
    }

    return (
        <Lcalendar onChange={setDate} value={date} onClickDay={onChangeDay}/>
    );
} 