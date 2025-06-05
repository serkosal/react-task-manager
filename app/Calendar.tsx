import { type ReactElement } from "react"

export default function Calendar({children} : {children?: ReactElement})
{
    return <div className="calendar">
        Calendar
        {children}
    </div>
} 