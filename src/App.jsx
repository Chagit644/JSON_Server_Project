import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Signup from './pages/Signup/Signup.jsx'
import UserDetailsEntry from './pages/Signup/UserDetailsEntry.jsx'
import Posts from './pages/Home/Posts'
import Todos from './pages/Home/Todos'
import Albums from './pages/Home/Albums'
import HomeLayout from './components/HomeLayout'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to='/login' replace />}/>
        <Route path='users/:id/home' element={<HomeLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='posts' element={<Posts/>} />
          <Route path='todos' element={<Todos/>} />
          <Route path='albums' element={<Albums/>} />
        </Route>
        <Route path='login' element={<Login/>}/>
        <Route path='signup'>
          <Route index element={<Signup/>}/>
          <Route path='details' element={<UserDetailsEntry/>}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
  
}

export default App
