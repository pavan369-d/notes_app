import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Favourites from "./pages/Favourites"
import Signup from "./pages/Singup"
import Signin from "./pages/Signin"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const [copy,setCopy] = useState('')
  const [text, setText] = useState('');
  const {user} = useAuthContext();

  const copyTex = async()=>{
    console.log(text)
    try{
      await navigator.clipboard.writeText(text);
      setCopy('Copied to clipboard!');
    }catch(error){
      console.error("Failed to copy:", error)
    }
  }

  const handleLogout = ()=>{
    localStorage.removeItem('user');
  }

  useEffect(()=>{
    console.log('User logged out',user,copy)
  },[user])
 return (
  <div className={user? "container":""}>
  {user &&  <aside className="aside">
          <div className="aside-content">
           
            <h3><Link to="/"> <img src="https://www.hellotars.com/wp-content/uploads/2019/05/Favicon-32px-1.png" alt="logo"  /></Link>AI Notes</h3>
          <div className="hr"></div>
            <nav>
             <Link to="/" ><i className="ri-home-2-fill"></i>Home</Link>
             <Link to="/favourites"><i className="ri-star-line"></i>Favourites</Link>
            </nav>
          </div>
          <div className="user-account">{user.email} <span onClick={handleLogout}>Logout</span></div>
        </aside>}
  <Routes>
    <Route path="/" element={user? <Home text={text} setText={setText} copyTex={copyTex}/>:<Signin/>}/>
    <Route path="/favourites" element={user?<Favourites copyTex={copyTex}/>:<Signin/>}/>
    <Route path="/signup" element={!user?<Signup/>:<Home/>} />
    <Route path="/signin" element={<Signin/>}/>

  </Routes>
  </div>
 )
}

export default App
