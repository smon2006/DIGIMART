import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';

const Index = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {recentOrders,totalOrder,pendingOrder,cancelledOrder} = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id))
    },[])

    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
            items = ord.products[i].quantity + items; 
        }
        navigate('/payment',{
            state: {
                price: ord.price,
                items,
                orderId: ord._id 
            }
        }) 
    }

    return (
<div>
    <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
       
        <div className='flex justify-center items-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4'>
            <div className='bg-blue-50 w-[52px] h-[52px] shrink-0 rounded-full flex justify-center items-center text-xl'>
        <span className='text-xl text-[#2563EB]'><RiShoppingCart2Fill /></span>
            </div>
        <div className='flex flex-col justify-start items-start text-slate-600'>
        <h2 className='text-3xl font-bold text-slate-800'>{totalOrder}</h2>
        <span className='text-sm'>Orders </span>
        </div>     
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4'>
            <div className='bg-amber-50 w-[52px] h-[52px] shrink-0 rounded-full flex justify-center items-center text-xl'>
        <span className='text-xl text-amber-600'><RiShoppingCart2Fill /></span>
            </div>
        <div className='flex flex-col justify-start items-start text-slate-600'>
        <h2 className='text-3xl font-bold text-slate-800'>{pendingOrder}</h2>
        <span className='text-sm'>Pending Orders </span>
        </div>     
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4'>
            <div className='bg-red-50 w-[52px] h-[52px] shrink-0 rounded-full flex justify-center items-center text-xl'>
        <span className='text-xl text-red-500'><RiShoppingCart2Fill /></span>
            </div>
        <div className='flex flex-col justify-start items-start text-slate-600'>
        <h2 className='text-3xl font-bold text-slate-800'>{cancelledOrder}</h2>
        <span className='text-sm'>Cancelled Orders </span>
        </div>     
        </div> 
    </div>

    <div className='bg-white p-5 mt-5 rounded-2xl border border-slate-200 shadow-sm'>
        <h2 className='text-lg font-bold text-slate-700 pb-3 border-b border-slate-100'>Recent Orders</h2>
        <div className='pt-4'>
        <div className='relative overflow-x-auto rounded-lg'>
<table className='w-full text-sm text-left text-slate-500'>
    <thead className='text-xs text-slate-600 uppercase bg-slate-50'>
        <tr>
            <th scope='col' className='px-6 py-3 font-semibold'>Order Id</th>
            <th scope='col' className='px-6 py-3 font-semibold'>Price</th>
            <th scope='col' className='px-6 py-3 font-semibold'>Payment Status</th>
            <th scope='col' className='px-6 py-3 font-semibold'>Order Status</th>
            <th scope='col' className='px-6 py-3 font-semibold'>Action</th> 
        </tr>
    </thead>
        <tbody>
            {
                recentOrders.map((o,i) => <tr key={i} className='bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors'>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-slate-700'>#{o._id}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-slate-700'>₹{o.price}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap capitalize'>{o.payment_status }</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap capitalize'>{o.delivery_status}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    <Link to={`/dashboard/order/details/${o._id}`}><span className='bg-blue-50 text-[#2563EB] text-xs font-semibold mr-2 px-3 py-1 rounded-full'>View</span></Link>

                    {
                       o.payment_status !== 'paid' && <span onClick={() => redirect(o)} className='bg-blue-50 text-[#2563EB] text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer hover:bg-[#2563EB] hover:text-white transition-colors'>Pay Now</span> 
                    }

                </td> 
            </tr>
                
                )
            }
            
        </tbody>

</table>

        </div>
        </div>

    </div>
    
</div>
    );
};

export default Index;
