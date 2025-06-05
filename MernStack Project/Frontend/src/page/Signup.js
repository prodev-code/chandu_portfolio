import React, { useState } from 'react';
import loginSignuImage from "../assest/login-animation.gif";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from "react-hot-toast";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        image : ""
    });
    console.log(data)
    const handleShowPassword = () =>{
        setShowPassword(preve => !preve);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(preve => !preve);
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

    const handleUploadProfileImage = async (e) => {
         const data = await ImagetoBase64(e.target.files[0]);
         console.log(data);

         setData((preve)=> {
              return{
                ...preve,
                image : data
              }
         })
    }
    console.log(process.env.REACT_APP_SERVER_DOMAIN)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {firstName,email,password,confirmPassword} = data
        if(firstName && email && password && confirmPassword){
            if(password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
                    method : "POST",
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                console.log(dataRes)

                //alert(dataRes.message);
                toast(dataRes.message);
                
                if(dataRes.alert){
                    navigate("/login");
                }
                
            } else {
                alert("password doesn't match");
            }
        } else {
            alert("Please Enter required fields");
        }
    }

  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded mt-24'>
            {/*<h1 className='text-center text-2xl font-bold'>Sign up</h1> */}

            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                  <img src={data.image ? data.image : loginSignuImage} className='w-full h-full' />

                <label htmlFor='profileImage'>
                  <div className='absolute bottom-0 h-1/3 text-center w-full bg-slate-500 cursor-pointer bg-opacity-40'>
                    <p className='text-sm p-1'>Upload</p>
                  </div>
                  <input type={'file'} id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage}></input>
                </label>
            </div>

            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input type={'text'} id='firstName' name='firstName' required className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-500' value={data.firstName} onChange={handleOnChange}/>

                <label htmlFor='lastName'>Last Name</label>
                <input type={'text'} id='lastName' name='lastName' required className='mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange} />

                <label htmlFor='email'>Email</label>
                <input type={'email'} id='email' name='email' required className='mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange} />
                
                <label htmlFor='password'>Password</label>
                <div className='flex  px-2 py-1 rounded mt-1 bg-slate-200 focus-within:outline focus-within:outline-blue-400'>
                    <input type={showPassword ? "text":'password'} id='password' name='password' required className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} />
                    <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<FaEye />:<FaRegEyeSlash />}</span>
                </div>


                <label htmlFor='confirmpassword'>Confirm Password</label>
                <div className='flex  px-2 py-1 rounded mt-1 bg-slate-200 focus-within:outline focus-within:outline-blue-400'>
                    <input type={showConfirmPassword ? "text":'password'} id='confirmpassword' name='confirmPassword' required className=' w-full bg-slate-200 border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} />
                    <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ?<FaEye />:<FaRegEyeSlash />}</span>
                </div>

                <button className='w-full max-w-[120px] m-auto bg-blue-500 text-white hover:bg-blue-700 rounded-full font-medium text-center mt-5'>Sign up</button>


            </form>
            <p className='text-left text-sm mt-2'>Already have an account ? <Link to={"/login"} className='text-red-500 no-underline hover:underline'>Login</Link></p>

        </div>
    </div>
  )
}

export default Signup