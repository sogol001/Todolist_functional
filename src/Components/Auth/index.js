import React,{Component, useState} from 'react';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Auth =({isAthenticated ,authHandler})=>{
    const [loginFormShow , setLoginFormshow] = useState(true);
    const cookie = new Cookies();

    const loginHandler=async (event)=>{
        event.preventDefault();
        const loginData={
            username:event.target[0].value ,
             password:event.target[1].value  
        } 
        try{
        const response=await axios.post('http://localhost:8000/api/v1/users/login/',loginData)
       console.log(response);
       cookie.set('token',response.data.token);
       authHandler();
        console.log(loginData);
        }catch(error){
            return alert(error.response.data.message);
        }
    }

    const signupHandler= async (event)=>{
        event.preventDefault();
        const signupData={
            username:event.target[0].value ,
            email:event.target[1].value ,
             password:event.target[2].value  
        } 
        try{
        const response=await axios.post('http://localhost:8000/api/v1/users/signup/',signupData)
       console.log(response);   
       cookie.set('token',response.data.token);
       authHandler() ;     
      //  console.log(signupData);
        }catch(error){
            return alert(error.response.data.message);
        }
    }


    if (isAthenticated) {
        return <Redirect to="/todolist" />;
    }
    return(
        <>
        <div className="box">
            <div className="toggle">
                <h1
                className={
                 loginFormShow?'active':''
                }
                onClick={()=>
                    setLoginFormshow(true)}
                >Login</h1>
                <h1
                 className={
                !loginFormShow?'active':''
                }
                 onClick={()=>
                    setLoginFormshow(false)}
                >SignIn</h1>
            </div>
       
        {loginFormShow?(<form
        onSubmit={loginHandler}>
            <input placeholder="username" type="text"/>
            <input placeholder="password" type="password"/>
            <button className="submit-btn">login</button>
        </form>) :(<form
        onSubmit={signupHandler}>
        <input placeholder="username" type="text"/>
            <input placeholder="email" type="email"/>
            <input placeholder="password" type="password"/>
            <button className="submit-btn">register</button>
        </form>)}

        </div>
        </>
    )
}
export default Auth;