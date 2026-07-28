import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';

const Orders = () => {
    const [state, setState] = useState('all')

    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const {userInfo} = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(get_orders({status:state, customerId:userInfo.id}))
    },[state])

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
        <div className='bg-white p-5 rounded-2xl border border-slate-200 shadow-sm'>
            <div className='flex justify-between items-center pb-4 border-b border-slate-100 flex-wrap gap-3'>
                <h2 className='text-lg font-bold text-slate-700'>My Orders </h2>
                <select className='outline-none px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 font-medium focus:border-[#F26627] transition-colors' value={state} onChange={(e) => setState(e.target.value)} >
                    <option value="all">-- Order Status --</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select> 
            </div>

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
                myOrders.map((o,i) => <tr key={i} className='bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors'>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-slate-700'>#{o._id}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-slate-700'>₹{o.price}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap capitalize'>{o.payment_status }</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap capitalize'>{o.delivery_status}</td>
                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                    <Link to={`/dashboard/order/details/${o._id}`}><span className='bg-blue-50 text-[#F26627] text-xs font-semibold mr-2 px-3 py-1 rounded-full'>View</span></Link>

                    {
                       o.payment_status !== 'paid' && <span onClick={() => redirect(o)} className='bg-blue-50 text-[#F26627] text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer hover:bg-[#F26627] hover:text-white transition-colors'>Pay Now</span> 
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
    );
};

export default Orders;
