
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginAdmin from './views/admin/LoginAdmin'
import SelectLogin from './components/SelectLogin'
import RequireAdminAuth from './components/admin/RequireAdminAuth'
import HomeAdmin from './views/admin/HomeAdmin'
import RegisterAdmin from './views/admin/RegisterAdmin';
import LayoutAdmin from './components/admin/LayoutAdmin';
import AddUser from './views/admin/AddUser';
import LoginUser from './views/user/LoginUser';
import RequireUserAuth from './components/user/RequireUserAuth';
import HomeUser from './views/user/HomeUser';
import LayoutUser from './components/user/LayoutUser';
import AddTasks from './views/admin/AddTasks';
import SettingsAdmin from './views/admin/SettingsAdmin';
import SettingsUser from './views/user/SettingsUser';
import AddAward from './views/admin/AddAward';
import EditTask from './views/admin/EditTask';



function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<SelectLogin/>}/>
        <Route path="admin/register" element={<RegisterAdmin/>}/>
        
        <Route path="/admin/login" element={<LoginAdmin/>}/>
        <Route element={<RequireAdminAuth/>}>
          <Route path='/admin' element={<LayoutAdmin/>}>
            <Route index element={<HomeAdmin/>}/>
            <Route path='add-member' element={<AddUser/>}/>
            <Route path='add-tasks' element={<AddTasks/>}/>
            <Route path='edit-task/:id' element={<EditTask/>}/>
            <Route path='add-award' element={<AddAward/>}/>
            <Route path='settings' element={<SettingsAdmin/>}/>
          </Route>
        </Route>
        
        <Route path="/user/login" element={<LoginUser/>}/>
        <Route element={<RequireUserAuth/>}>
          <Route path="/user" element={<LayoutUser/>}>
            <Route index element={<HomeUser/>}/>
            <Route path='settings' element={<SettingsUser/>}/>
          </Route>
          {/* <Route path="/user" element={<LayoutUser/>}/> */}
        </Route>
        
        
        


      </Routes>
    </>
  )
}

export default App
