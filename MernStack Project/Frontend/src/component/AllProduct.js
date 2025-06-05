import React, { useEffect, useState } from 'react';
import FilteredProducts from './FilteredProducts';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';


const AllProduct = ({heading}) => {
    const productData = useSelector((state)=>state.product.productList);
    const categoryList = [...new Set(productData.map(el=> el.category))];
    const loadingArrayFeature = new Array(10).fill(null);
    
    //filter data display
    const [filterby,setFilterBy] = useState("")
    const [dataFilter,setDataFilter] = useState([])

    useEffect(() =>{
        setDataFilter(productData)
    },[productData])

    const handleFilterProduct = (category) =>{
        setFilterBy(category)
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
            setDataFilter(()=>{
            return[
            ...filter
            ]
        })
    }

  return (
    <div className='my-5'>
            <h2 className='font-bold text-2xl mb-5'>
              {heading}
            </h2>
    
            <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
               {
                  categoryList[0] ? ( categoryList.map(el =>{
                      return(
                        <FilteredProducts category={el} key={el} isActive={el === filterby} onClick={()=>handleFilterProduct(el)}/>
                      );
                  })
                ) : (
                  <div className='min-h-[150px] flex justify-center items-center'>
                    <p>Loading...</p>
                  </div>
               )}
              
            </div>
    
            <div className='flex flex-wrap justify-center gap-3 mt-4'>
                {
                  dataFilter[0] ? dataFilter.map(el => {
                    return(
                      <CardFeature
                        key={el._id}
                        id={el._id}
                        image={el.image}
                        name={el.name}
                        price={el.price}
                        category={el.category}
                      />
                    )
                  })
                  :
                  loadingArrayFeature.map((el,index) => (
                    <CardFeature loading="Loading..." key={index+"AllProduct"}/>
                  ))
                }
            </div>
    </div>
  )
}

export default AllProduct
