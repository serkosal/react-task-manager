import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
createBrowserRouter,
RouterProvider,
} from "react-router";

import App from './App.tsx'
import Calendar from './Calendar.tsx';

import './app.css'

const router = createBrowserRouter([
    { path: "/react-task-manager", element: <App />},
    { path: "/react-task-manager/calendar/", element: <Calendar />}
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
