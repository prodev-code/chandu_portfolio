import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({name,image,category,price,loading,id}) => {
  return (
    <div className='bg-white p-2 shadow-md rounded min-w-[150px]'>
      {
        name ? (
          <>
            <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}>
              <div className='w-40 min-h-[150px]'>
                <img src={image} className='h-full w-full' />
              </div>
              <h3 className='font-semibold text-center text-purple-800 capitalize text-lg'>{name}</h3>
              <p className='text-center font-medium text-slate-400 lowercase'>{category}</p>
              <p className='font-bold'><span className='text-green-700'>₹</span><span>{price}</span></p>
            </Link>
          </>
        ) : (
          <div className='flex justify-center items-center h-full'>
            <p>{loading}</p>
          </div>
        )
      }
        
    </div>
  )
}

export default HomeCard