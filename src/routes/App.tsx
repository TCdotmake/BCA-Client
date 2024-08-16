import {  Link, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login'
export default function App() {

  return (
    <>
      <h1>Betrayal at the House on the Hill</h1>
      <hr/>
      <Routes>
        <Route path='/' element ={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='login' element={<Login />}/>
          <Route  path='signup' element={<Signup/>} />
          <Route path='*' element={<NoMatch/>}/>
        </Route>
      </Routes>
    </>
  )
}

function Layout(){
  return (
    <>
      <Outlet/>
    </>
  )
}

function Home(){
  return(
    <>
      <nav>
        <ul>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to = '/signup'>Sign Up</Link></li>
        </ul>
      </nav>
      </>
  )
}

function Signup(){
  return(
      <>
          <form>
          <label>User Name</label>
          <input type="text"></input>
              <label>Email</label>
              <input type="email"></input>
              <label>Password</label>
              <input type='password'></input>
              <label>Confirm Password</label>
              <input type='password'></input>
              <button type='submit'>Sign Up</button>
          </form>
      </>
  )
}


function NoMatch(){
  return(
    <>
      <h2>Not found??!!</h2>
    </>
  )
}