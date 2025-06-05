import React, { useState } from 'react';
import { BsCloudUploadFill } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const Newproduct = () => {
  const [data, setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e) =>{
     const {name,value} = e.target

     setData((preve)=>{
       return{
         ...preve,
         [name] : value
       }
     })
  }

  const uploadImage  = async (e) =>{
    const data = await ImagetoBase64(e.target.files[0]);
    //console.log(data);

    setData((preve)=>{
       return{
          ...preve,
          image : data
       }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(data);

    const {name,image,category,price} = data

    if(name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const fetchRes = await fetchData.json()

      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return {
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    } 
    else{
      toast("Enter required fields");
    }

  }

  return (
    <div className='p-3'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-4 bg-white rounded' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name='name' className='bg-slate-300 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-300 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option>Select</option>
          <option>Fruits</option>
          <option>Vegetebles</option>
          <option>Ice cream</option>
          <option>Pizza</option>
          <option>Cool Drinks</option>
          <option>Rice</option>
          <option>Drinks</option>
        </select>
        
        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-300 rounded items-center justify-center flex cursor-pointer'>
            
            {
               data.image ? <img src={data.image} className='h-full w-full overflow-hidden' /> : <span className='text-4xl'><BsCloudUploadFill /></span>
            }
            <input type={'file'} accept='image/*' id='image' onChange={uploadImage} className='hidden' ></input>

          </div> 
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-300 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='bg-slate-300 p-1 my-1' name='description' onChange={handleOnChange} value={data.description}></textarea>

        <button className='w-full max-w-[120px] m-auto bg-blue-500 text-white hover:bg-blue-700 rounded-full font-medium text-center mt-3'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct