import React, { useEffect, useRef, useState } from 'react';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import FilteredProducts from '../component/FilteredProducts';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(0,4)
  const homeProductCartListVegetables = productData.filter(el => el.category === "Vegetebles",[])
  console.log(homeProductCartListVegetables)

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  
  const slideProductRef = useRef()
  const nextProduct = () =>{
      slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () =>{
      slideProductRef.current.scrollLeft -= 200;
  };

  

  

  return (
    <div className='p-2 md:p-4 '>
      <div className='md:flex py-2 mt-11'>
        
          <div className='md:w-1/2 mt-5'>
          <div className='flex gap-3 bg-green-600  w-fit px-2 items-center rounded-full text-white'>
             <p className='text-sm font-medium p-1'>Order Delivery</p>
             <img src='https://as1.ftcdn.net/v2/jpg/06/27/47/54/1000_F_627475421_EJz4TyFExMq1WA0AMHcmLXXHbG5VxWth.jpg' className='h-5' />
          </div>
            <h2 className='text-3xl md:text-7xl font-bold py-3'>The fastest delivery in <span className='text-blue-800'>Your Home</span></h2>
            <p className='py-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <button className='font-bold bg-orange-400 text-white px-3 py-1 rounded-md'>Order Now</button>
          </div>
          <div className='md:w-1/2 flex flex-wrap gap-3 p-4 justify-center'>
            {
              homeProductCartList[0] ? homeProductCartList.map(el => {
                return(
                  <HomeCard 
                      key={el._id}
                      id={el._id}
                      image= {el.image}
                      name= {el.name}
                      price= {el.price}
                      category= {el.category}

                  />
                );
              })
              : 
              loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })
            }  
          </div>
      </div>
 
      <div>
          <div className='flex w-full items-center'>
            <h2 className='font-bold text-2xl mb-5'>
              Fresh vegetables
            </h2>
            <div className='ml-auto flex gap-4'>
              <button onClick={preveProduct} className='bg-slate-100 hover:bg-slate-300 text-lg p-1'><GrFormPrevious /></button>
              <button onClick={nextProduct} className='bg-slate-100 hover:bg-slate-300 text-lg p-1'><GrFormNext /></button>
            </div>
          </div>
          <div className='flex gap-3 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
              homeProductCartListVegetables[0] ? homeProductCartListVegetables.map((el) => {
                return(
                  <CardFeature 
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    image={el.image}
                    price={el.price}
                  />
                );
              })
              :
              loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index}/>
              ))
            }
            
          </div>
      </div>
 
      <AllProduct heading={"Your Product"} />     

    </div>
  )
}

export default Home