import React from 'react';
import { FaMinus,FaPlus } from "react-icons/fa6";
import {MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlice';

const CartProduct = ({id,name,image,category,qty,total,price}) => {
    const dispatch = useDispatch();
  return (
    <div className='bg-slate-200 p-2 flex rounded border border-slate-400'>
        <div className='bg-white p-3 rounded overflow-hidden'>
            <img src={image} className='h-28 w-40 object-cover'/>
        </div>
        <div className='flex flex-col min-w-[200px] px-3 p-1 w-full'>
            <div className='flex justify-between'>
                <h3 className='font-semibold text-purple-800 capitalize text-lg md:text-xl'>
                    {name}
                </h3>
                <div onClick={()=>dispatch(deleteCartItem(id))} className='cursor-pointer hover:text-red-800'>
                    <MdDelete />
                </div>
            </div>
          <p className=' font-medium text-slate-400 lowercase'>{category}</p>
          <p className='font-bold text-base py-2'><span className='text-green-700'>₹</span><span>{price}</span></p>
          <div className='flex justify-between bg-green-400'>
            <div className='flex gap-2 px-2 py-1 items-center'>
                <button className='w-5 bg-blue-400 mt-3 hover:text-white rounded' onClick={()=>dispatch(decreaseQty(id))}>
                    <FaMinus />
                </button>
                <p className='font-semibold p-1'>{qty}</p>
                <button className='w-5 bg-blue-400 mt-3 hover:text-white rounded' onClick={()=>dispatch(increaseQty(id))}>
                    <FaPlus />
                </button>
            </div>
            <div className='flex items-center gap-3 font-bold mr-2'>
                <p>Total :</p>
                <p><span className='text-green-700'>₹</span> {total}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CartProduct