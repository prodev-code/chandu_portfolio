import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state)=>state.user)
    console.log(userData.email)
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        setShowMenu(preve => !preve);
    }

    const handleLogout = () =>{
         dispatch(logoutRedux());
         toast("Logout Successfully");
    }

    const cartItemNumber = useSelector((state)=>state.product.cartItem)
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-blue-300'>
            {/*desktpo */}

            <div className='flex items-center h-full justify-between md:gap-7'>
                <Link to={""}>
                    <div>
                        <h2>GROCERY</h2>
                    </div>
                </Link>

                <div className='flex items-center gap-4'>
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu/68300b5d4ab5b6ca893a7141"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className='text-2xl teext-slate-500 relative'>
                        <Link to={"cart"}><FaOpencart />
                            <div className='absolute -top-1 -right-4 text-white bg-red-500 w-4 h-4 text-sm p-0 rounded-full m-0 mx-3 text-center'>
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className='text-slate-600' onClick={handleShowMenu}>
                        <div className='text-3xl rounded-full cursor-pointer w-10 h-10 overflow-hidden mt-3'>
                            {userData.image ? <img src={userData.image} className='w-full h-full'/> : <HiOutlineUserCircle />
                            }
                        </div>
                        {
                            showMenu && (
                                <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[100px] items-center'>
                                    {
                                        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer hover:text-blue-500'>New product</Link>
                                    }
                                    
                                    {
                                       userData.image ? <p className='cursor-pointer text-red-500 hover:text-red-700' onClick={handleLogout}>Logout</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                                    }

                                    <nav className='text-base md:text-lg flex flex-col md:hidden'>
                                        <Link to={""} className='px-2 py-1'>Home</Link>
                                        <Link to={"menu/68300b5d4ab5b6ca893a7141"} className='px-2 py-1'>Menu</Link>
                                        <Link to={"about"} className='px-2 py-1'>About</Link>
                                        <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                                    </nav>
                                    
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>


            {/* mobile */}


        </header>
    )
}

export default Header