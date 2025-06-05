import React from 'react';
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const CardFeature = ({image,name,price,category,loading,id}) => {
  const dispatch = useDispatch();
  const hanleAddCartProduct = (e) =>{
     e.stopPropagation()
     dispatch(addCartItem({
       _id : id,
       name : name,
       price : price,
       category : category,
       image : image
     }))
     
  };
  return (
    <div className='w-full min-w-[150px] max-w-[150px] bg-white shadow-lg hover:drop-shadow-lg hover:shadow-yellow-200 drop-shadow-lg p-2 py-5 rounded cursor-pointer'>
      {
        image ? ( <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}>
            <div className='h-24 p-2 flex flex-col justify-center items-center'>
              <img src={image} className='h-full' />
            </div>
            <h3 className='font-semibold text-center text-green-800 capitalize text-lg mt-2 whitespace-nowrap overflow-hidden'>{name}</h3>
            <p className=' font-medium text-slate-400 lowercase'>{category}</p>
            <p className='font-bold'><span className='text-green-700'>₹</span><span>{price}</span></p>
          </Link>
          <button className='w-full bg-orange-500 mt-3 hover:text-white rounded-md' onClick={hanleAddCartProduct}>Add Cart</button>
        </>
       ) : (
        <div className='min-h-[150px] flex justify-center items-center'>
          <p>{loading}</p>
        </div>
      )}
      
    </div>
  )
}

export default CardFeature