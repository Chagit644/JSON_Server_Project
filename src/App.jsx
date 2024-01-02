import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Info from './pages/Home/Info'
import Posts from './pages/Home/Posts'
import Todos from './pages/Home/Todos'
import Albums from './pages/Home/Albums'
import HomeLayout from './components/HomeLayout'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route path='home' element={<HomeLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='info' element={<Info/>} />
          <Route path='posts' element={<Posts/>} />
          <Route path='todos' element={<Todos/>} />
          <Route path='albums' element={<Albums/>} />
        </Route>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
  
}

export default App
