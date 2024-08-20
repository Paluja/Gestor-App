import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './hooks/AuthAdminContext.jsx'
import {AuthUserProvider} from './hooks/UserContext.jsx'
import {TaskProvider} from './hooks/TasksContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <AuthUserProvider>
      <TaskProvider>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>  
      </TaskProvider>
      </AuthUserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
