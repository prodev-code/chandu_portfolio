import React from 'react';
import { GiKnifeFork } from "react-icons/gi";

const FilteredProducts = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-2xl p-5 bg-yellow-400 rounded-full cursor-pointer hover:scale-105 hover:drop-shadow-lg shadow-lg ${isActive && "bg-red-700 text-white"} `}>
       <GiKnifeFork />
      </div>
      <p className='text-center font-semibold text-sm my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilteredProducts