import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams()
  const productData = useSelector(state => state.product.productList)
  const dispatch = useDispatch()
  
  const productDisplay = productData.filter(el => el._id ===  filterby)[0]
  console.log(productDisplay)

  const hanleAddCartProduct = (e) =>{
      e.stopPropagation()
      dispatch(addCartItem(productDisplay))
      
  };
  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-3xl m-auto bg-white md:flex mt-14'>
        <div className='max-w-sm shadow overflow-hidden w-full p-5'>
          <img src={productDisplay.image} className='hover:scale-105 transition-all cursor-pointer object-contain h-72 w-96'/>
        </div>

        <div className='flex flex-col min-w-[200px] px-3 p-1'>
          <h3 className='font-semibold text-purple-800 capitalize text-2xl md:text-3xl'>{productDisplay.name}</h3>
          <p className=' font-medium text-slate-400 lowercase text-xl'>{productDisplay.category}</p>
          <p className='font-bold md:text-2xl py-2'><span className='text-green-700'>₹</span><span>{productDisplay.price}</span></p>
          <div className='flex gap-2 px-2 py-1'>
            <button className='w-full bg-orange-500 mt-3 hover:text-white rounded-md' onClick={hanleAddCartProduct}>Add Cart</button>
            <button className='w-full bg-orange-500 mt-3 hover:text-white rounded-md'>Buy</button>
          </div>
          <div>
            <p className='text-slate-500 font-medium'>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  )
}

export default Menu