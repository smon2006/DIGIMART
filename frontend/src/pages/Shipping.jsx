import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../store/reducers/orderReducer';

const Shipping = () => {

    const { state: {products,price,shipping_fee,items }} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth) 

    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        province: '',
        city: '',
        area: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const save = (e) => {
        e.preventDefault()
        const {name,address,phone,post,province,city,area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }

    }

    const placeOrder = () => {
        dispatch(place_order({
            price,
            products,
            shipping_fee,
            items,
            shippingInfo : state,
            userId: userInfo.id,
            navigate 

        }))
    }

    return (
        <div>
          <Header/>
          <PageHeader title='Shipping' crumbs={[{ to: '/card', label: 'Cart' }, { label: 'Shipping' }]} />

    <section className=''>
        <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
           <div className='w-full flex flex-wrap gap-y-6'>
            <div className='w-[67%] md-lg:w-full'>
                <div className='flex flex-col gap-4'>
                    <div className='bg-white p-6 shadow-sm rounded-2xl border border-slate-200'>

                        <h2 className='text-slate-800 font-bold text-lg pb-4 border-b border-slate-100 mb-2'>Shipping Information </h2>

            {
              !res && <>
             <form onSubmit={save}>
            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="name"> Name </label>
                <input onChange={inputHandle} value={state.name} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="name" id="name" placeholder='Name' /> 
            </div>

            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="address"> Address </label>
                <input onChange={inputHandle} value={state.address} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="address" id="address" placeholder='Address' /> 
            </div> 
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="phone"> Phone </label>
                <input onChange={inputHandle} value={state.phone} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="phone" id="phone" placeholder='Phone' /> 
            </div>

            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="post"> Post </label>
                <input onChange={inputHandle} value={state.post} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="post" id="post" placeholder='Post' /> 
            </div> 
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="province"> Province </label>
                <input onChange={inputHandle} value={state.province} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="province" id="province" placeholder='Province' /> 
            </div>

            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="city"> City </label>
                <input onChange={inputHandle} value={state.city} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="city" id="city" placeholder='City' /> 
            </div> 
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 items-start'>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label className='text-sm font-medium text-slate-700' htmlFor="area"> Area </label>
                <input onChange={inputHandle} value={state.area} type="text" className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' name="area" id="area" placeholder='Area' /> 
            </div>

            <div className='flex flex-col gap-1 mt-6 w-full'>
               <button className='px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white text-sm font-semibold'>Save Change </button>
            </div> 
            </div> 
                </form>

                </>
            }

            {
                res && <div className='flex flex-col gap-2'>
                <h2 className='text-slate-700 font-semibold pb-1'>Deliver To {state.name}</h2>
                <p className='text-sm text-slate-600'>
                    <span className='bg-blue-50 text-[#2563EB] text-xs font-semibold mr-2 px-2.5 py-1 rounded-full'>Home</span>
                    <span>{state.phone} {state.address} {state.province} {state.city} {state.area}  </span>

                    <span onClick={() => setRes(false)} className='text-[#2563EB] font-semibold cursor-pointer hover:underline ml-1'>Change </span>
                </p>

                <p className='text-slate-500 text-xs' >Email To ariyan@gmail.com</p>

            </div>
            }
              </div>

              <div className='flex flex-col gap-3'>
              {
                   products.map((p,i) => <div key={i} className='flex bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-col gap-3'>
                   <div className='flex justify-start items-center pb-2 border-b border-slate-100'>
                       <h2 className='text-sm text-slate-700 font-bold'>{p.shopName}</h2>
                   </div>

                   {
                       p.products.map((pt,i) => <div key={i} className='w-full flex flex-wrap items-center gap-3 py-1'>
                       <div className='flex sm:w-full gap-3 w-7/12'>
                           <div className='flex gap-3 justify-start items-center'>
                       <img className='w-[80px] h-[80px] rounded-lg object-cover border border-slate-100' src={pt.productInfo.images[0]} alt="" />
                       <div className='pr-4 text-slate-600'>
                       <h2 className='text-sm font-semibold text-slate-700'>{pt.productInfo.name} </h2>
                       <span className='text-xs text-slate-500'>Brand: {pt.productInfo.brand}</span>
                       </div>
                           </div>
                       </div>

   <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
       <div className='pl-4 sm:pl-0'>
       <h2 className='text-base font-bold text-slate-800'>₹{pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}</h2>
           <p className='line-through text-xs text-slate-400'>₹{pt.productInfo.price}</p>
           <p className='text-xs text-red-500 font-semibold'>-{pt.productInfo.discount}%</p>
       </div>
      
   </div>

                   </div>)
                   }

               </div>) 
                } 
              </div>

                </div> 
            </div>

            <div className='w-[33%] md-lg:w-full'>
    <div className='pl-3 md-lg:pl-0'>
        
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-slate-600 flex flex-col gap-4 sticky top-24'>
                <h2 className='text-lg font-bold text-slate-800 pb-3 border-b border-slate-100'>Order Summary</h2>
                <div className='flex justify-between items-center text-sm'>
                    <span>Items Total </span>
                    <span className='font-medium text-slate-700'>₹{price}</span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                    <span>Delivery Fee </span>
                    <span className='font-medium text-slate-700'>₹{shipping_fee} </span>
                </div>

                <div className='flex justify-between items-center pt-3 border-t border-slate-100'>
                    <span className='font-semibold text-slate-700'>Total</span>
                    <span className='text-xl font-bold text-[#2563EB]'>₹{price + shipping_fee} </span>
                </div>
                <button onClick={placeOrder} disabled={res ? false : true} className={`px-5 py-3 rounded-lg transition-colors ${res ? 'bg-[#2563EB] hover:bg-[#1d4ed8]' : 'bg-slate-300 cursor-not-allowed'}  text-sm text-white uppercase font-semibold`}>
                   Place Order 
                </button>

            </div>
        
    </div>

</div>

            </div>  

        </div>
        
   </section>       

          <Footer/>
        </div>
    );
};

export default Shipping;