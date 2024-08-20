
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginAdmin from './views/admin/LoginAdmin'
import Select from './components/Select'
import RequireAdminAuth from './components/admin/RequireAdminAuth'
import HomeAdmin from './views/admin/HomeAdmin'
import RegisterAdmin from './views/admin/RegisterAdmin';
import LayoutAdmin from './components/admin/LayoutAdmin';
import AddUser from './views/admin/AddUser';
import LoginUser from './views/user/LoginUser';
import RequireUserAuth from './components/user/RequireUserAuth';
import HomeUser from './views/user/HomeUser';
import LayoutUser from './components/user/LayoutUser';


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Select/>}/>
        <Route path="admin/register" element={<RegisterAdmin/>}/>
        
        <Route path="/admin/login" element={<LoginAdmin/>}/>
        <Route element={<RequireAdminAuth/>}>
          <Route path='/admin' element={<LayoutAdmin/>}>
            <Route index element={<HomeAdmin/>}/>
            <Route path='add-member' element={<AddUser/>}/>
          </Route>
        </Route>
        
        <Route path="/user/login" element={<LoginUser/>}/>
        <Route element={<RequireUserAuth/>}>
          <Route path="/user" element={<LayoutUser/>}>
            <Route index element={<HomeUser/>}/>
          </Route>
          {/* <Route path="/user" element={<LayoutUser/>}/> */}
        </Route>
        
        
        


      </Routes>
    </>
  )
}

export default App
