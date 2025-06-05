import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import './index.css';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  console.log(productData)
  useEffect(()=>{
     (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
     })()
  },[])
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='bg-slate-300 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
    
  );
}

export default App;
