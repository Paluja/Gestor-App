
import LoginAdmin from './components/admin/LoginAdmin'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Select from './components/Select'
import LoginUser from './components/user/LoginUser'
import RequireAdminAuth from './components/admin/RequireAdminAuth'
import Dashboard from './components/admin/Dashboard'
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Select/>}/>
        <Route path="/admin/login" element={<LoginAdmin/>}/>
        <Route element={<RequireAdminAuth/>}>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/user/login" element={<LoginUser/>}/>
        
        


      </Routes>
    </>
  )
}

export default App
