import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router";


import App from './App.tsx'
import './app.css'

import MainTaskView from './components/MainTaskVIew';
import Calendar from './components/Calendar.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route index element={<App> <MainTaskView/> </App>} />
                <Route path='/calendar/' element={<App> <Calendar /> </App>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
