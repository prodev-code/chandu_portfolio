import React from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../component/cartProduct';
import emptyCartImage from "../assest/empty.gif";

const Cart = () => {
  const productCartItem = useSelector((state)=>state.product.cartItem)
  console.log(productCartItem);

  const totalPrice = productCartItem.reduce((acc,curr)=>acc + parseInt(curr.total),0);
  const totalQty = productCartItem.reduce((acc,curr)=>acc + parseInt(curr.qty),0);  
  return (
    <>
        <div className='p-2 md:p-5'>
          <div className='mt-16'>
            <h2 className='text-lg md:text-2xl font-bold text-slate-600 mt-12'>Your Cart Items</h2>
          </div>

          { productCartItem[0] ?
            <div className='my-4 flex gap-3'>
              {/* display cart items */}  
              <div className='w-full max-w-3xl'>
                  {
                    productCartItem.map(el => {
                        return(
                          <CartProduct 
                              key={el._id}
                              id={el._id}
                              name={el.name}
                              image={el.image}
                              category={el.category}
                              price={el.price}
                              qty={el.qty}
                              total={el.total}
                          />
                        )
                    })
                  }
              </div>

              {/* total cart items */}
              <div className='w-full max-w-sm bg-gray-400 ml-auto rounded h-48'>
                <h2 className='bg-slate-500 text-white p-2 text-lg'>Summary</h2>
                <div className='flex w-full gap-2 py-2 border-b'>
                    <p>Total Qty</p>
                    <p className='ml-auto w-32 font-bold'> {totalQty} </p>
                </div>

                <div className='flex w-full gap-2 py-2 border-b'>
                    <p>Total Price</p>
                    <p className='ml-auto w-32 font-bold'><span className='text-blue-500'>₹</span> {totalPrice} </p>
                </div>
                <button className='bg-orange-500 rounded w-full mt-2 hover:text-white'>Payment</button>

              </div>
            </div>
            :
            <>
              <div className='flex w-full justify-center items-center flex-col'>
                <img src={emptyCartImage} className='h-56 w-56'/>
                <p className='text-slate-500 text-3xl font-bold'>Empty Cart</p>
              </div>
            </>
          }
        </div>
    </>
  )
}

export default Cart