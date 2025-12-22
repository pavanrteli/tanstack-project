import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
const Header = () => {

  const navigate=useNavigate()

  const handleFetch=()=>{
    navigate('/rq')
  }

  const handleFetchOld=()=>{
    navigate('/old')
  }
  return (
    <>
    <div style={{display:'flex', gap:'10px'}}>
      <div onClick={()=>navigate('/')}>Home</div>
      <div onClick={handleFetch}>Fetchrq</div>
      <div onClick={handleFetchOld}>Fetchold</div>
    </div>
    <main>
      <Outlet/>
    </main>
    </>

  )
}

export default Header