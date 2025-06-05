import React, { useState } from 'react';
import loginSignuImage from "../assest/login-animation.gif";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [data, setData] = useState({
      email : "",
      password : "",
  });
  
  const userData = useSelector(state => state.user)


  const dispatch = useDispatch()


  const handleShowPassword = () =>{
      setShowPassword(preve => !preve);
  };
  
  const handleOnChange = (e) => {
      const {name, value} = e.target
      setData((preve)=> {
          return{
              ...preve,
              [name] : value
          }
      })
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {email,password} = data
      if(email && password){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })

            const dataRes = await fetchData.json()
            console.log(dataRes)
            
            toast(dataRes.message)

            if(dataRes.alert){
                dispatch(loginRedux(dataRes))
                navigate("/")
            }

            console.log(userData);

      } else {
          alert("Please Enter required fields");
      }
  }
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded mt-24'>
            {/*<h1 className='text-center text-2xl font-bold'>Sign up</h1> */}

            <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                  <img src={loginSignuImage} className='w-full' />
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>

                <label htmlFor='email'>Email</label>
                <input type={'email'} id='email' name='email' required className='mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange} />
                
                <label htmlFor='password'>Password</label>
                <div className='flex  px-2 py-1 rounded mt-1 bg-slate-200 focus-within:outline focus-within:outline-blue-400'>
                    <input type={showPassword ? "text":'password'} id='password' name='password' required className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} />
                    <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<FaEye />:<FaRegEyeSlash />}</span>
                </div>

                <button className='w-full max-w-[120px] m-auto bg-blue-500 text-white hover:bg-blue-700 rounded-full font-medium text-center mt-5'>Login</button>


            </form>
            <p className='text-left text-sm mt-2'>Don't have an account ? <Link to={"/signup"} className='text-red-500 no-underline hover:underline'>Signup</Link></p>

        </div>
    </div>
  )
}

export default Login