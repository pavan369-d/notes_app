import { useState } from "react"
import {useSignup} from '../hooks/useSignup'
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = ()=>{
    const {signupFun,isLoading,error} = useSignup();
    const {user} = useAuthContext();
    const [useR,setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const handleUser = (e)=>{
        const {name,value} = e.target
        setUser(prev=>({...prev,[name]:value}))
    }   

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password,confirmPassword} = useR;
        if(password === confirmPassword && password!=='' || confirmPassword!==''){
            console.log(name,email,password);
            await signupFun(name,email,password);
            console.log(user+" tokens");
            console.log(error);
        }else{
            alert('Password does not match!');
        }
       
    }
    

    return(
        <form onSubmit={handleSubmit} className="signup">
         {error && <p>{error}</p>}
          <label >Name:</label>
            <input 
            name="name"
            type="text" 
            placeholder="name"
            value={useR.name}
            onChange={handleUser}  />
            <label >Email:</label>
             <input 
              name="email"
            type="text" 
            placeholder="email"
            value={useR.email}
            onChange={handleUser}  />
            <label >Password:</label>
             <input 
              name="password"
            type="text" 
            placeholder="password"
            value={useR.password}
            onChange={handleUser}  />
            <label >Password:</label>
             <input 
              name="confirmPassword"
            type="text" 
            placeholder="confirmpassword"
            value={useR.confirmPassword}
            onChange={handleUser}  />
            <button type="submit">signup</button>
        </form>
    )
}

export default Signup