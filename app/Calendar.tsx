import { useState } from 'react';
import Lcalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { type ReactElement } from "react"

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar({children} : {children?: ReactElement})
{
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div>
            <Lcalendar onChange={onChange} value={value} />
        </div>
    );
} 