import React, { useEffect } from 'react';
import { MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6"; 
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment';
import customer from '../../assets/demo.jpg'

const SellerDashboard = () => {

    const dispatch = useDispatch()
    const {totalSale,totalOrder,totalProduct,totalPendingOrder,recentOrder,recentMessage} = useSelector(state=> state.dashboard)
    const {userInfo} = useSelector(state=> state.auth)



    useEffect(() => {
        dispatch(get_seller_dashboard_data())
    }, [])

    const state = {
        series : [
            {
                name : "Orders",
                data : [23,34,45,56,76,34,23,76,87,78,34,45]
            },
            {
                name : "Revenue",
                data : [67,39,45,56,90,56,23,56,87,78,67,78]
            },
            {
                name : "Sales",
                data : [34,39,56,56,80,67,23,56,98,78,45,56]
            },
        ],
        options : {
            colors : ['#2563EB','#EDBB0E','#16A34A'],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                }
            },
            chart : {
                background : 'transparent',
                foreColor : '#64748B',
                toolbar: { show: false }
            },
            dataLabels : {
                enabled : false
            },
            grid: {
                borderColor: '#E2E8F0'
            },
            stroke : {
                show : true,
                curve : 'smooth',
                width  : .5,
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            responsive : [
                {
                    breakpoint : 565,
                    yaxis : {
                        categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    },
                    options : {
                        plotOptions: {
                            bar : {
                                horizontal : true
                            }
                        },
                        chart : {
                            height : "550px"
                        }
                    }
                }
            ]
        }
    }

    const statCards = [
        { label: 'Total Sales', value: `₹${totalSale}`, icon: <MdCurrencyExchange />, bg: 'bg-red-50', iconBg: 'bg-red-500' },
        { label: 'Products', value: totalProduct, icon: <MdProductionQuantityLimits />, bg: 'bg-blue-50', iconBg: 'bg-[#2563EB]' },
        { label: 'Orders', value: totalOrder, icon: <FaCartShopping />, bg: 'bg-emerald-50', iconBg: 'bg-emerald-600' },
        { label: 'Pending Orders', value: totalPendingOrder, icon: <FaCartShopping />, bg: 'bg-amber-50', iconBg: 'bg-amber-500' },
    ]

    return (
        <div className='py-2'>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    statCards.map((s, i) => (
                        <div key={i} className={`flex justify-between items-center p-5 ${s.bg} border border-slate-100 rounded-xl gap-3 shadow-sm hover:shadow-md transition-shadow`}>
                            <div className='flex flex-col justify-start items-start text-slate-700'>
                                <h2 className='text-2xl font-bold'>{s.value}</h2>
                                <span className='text-sm font-medium text-slate-500'>{s.label}</span>
                            </div>

                            <div className={`w-[46px] h-[46px] rounded-full ${s.iconBg} flex justify-center items-center text-xl text-white shadow-md shrink-0`}>
                                {s.icon}
                            </div>
                        </div>
                    ))
                }
            </div>



        <div className='w-full flex flex-wrap mt-6'>
            <div className='w-full lg:w-7/12 lg:pr-3'>
                <div className='w-full bg-white p-5 rounded-xl border border-slate-100 shadow-sm'>
            <Chart options={state.options} series={state.series} type='bar' height={350} />
                </div>
            </div>


        <div className='w-full lg:w-5/12 lg:pl-3 mt-6 lg:mt-0'>
            <div className='w-full bg-white p-5 rounded-xl border border-slate-100 shadow-sm h-full'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-base text-slate-700 pb-3'>Recent Customer Message</h2>
                    <Link className='font-semibold text-xs text-[#2563EB] hover:underline'>View All</Link>
                </div>

        <div className='flex flex-col gap-2 pt-4'>
            <ol className='relative border-l border-slate-200 ml-4'>

    {
        recentMessage.map((m, i) => <li key={i} className='mb-4 ml-6'>
        <div className='flex absolute -left-5 shadow-md justify-center items-center w-9 h-9 p-[5px] bg-[#2563EB] rounded-full z-10 ring-4 ring-white'>
        {
            m.senderId === userInfo._id ? <img className='w-full rounded-full h-full' src={userInfo.image} alt="" /> : <img className='w-full rounded-full h-full' src={customer} alt="" />
        }
        </div>
        <div className='p-3 bg-slate-50 rounded-lg border border-slate-100'>
        <div className='flex justify-between items-center mb-1.5 gap-2'>
    <Link className='text-sm font-semibold text-slate-700'>{m.senderName}</Link>
    <time className='text-xs font-normal text-slate-400 whitespace-nowrap'> {moment(m.createdAt).startOf('hour').fromNow()}</time>
        </div>
        <div className='p-2 text-xs font-normal text-slate-600 bg-white rounded-lg border border-slate-100'>
            {m.message}
        </div>
        </div>
    </li>)
        }



            </ol>

        </div>


            </div>
        </div>
        </div>


        <div className='w-full p-5 bg-white rounded-xl border border-slate-100 shadow-sm mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-base text-slate-700 pb-3'>Recent Orders</h2>
                <Link className='font-semibold text-xs text-[#2563EB] hover:underline'>View All</Link>
               </div>

    <div className='relative overflow-x-auto'>
    <table className='w-full text-sm text-left'>
        <thead className='text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100 bg-slate-50'>
        <tr>
            <th scope='col' className='py-3 px-4 rounded-l-lg'>Order Id</th>
            <th scope='col' className='py-3 px-4'>Price</th>
            <th scope='col' className='py-3 px-4'>Payment Status</th>
            <th scope='col' className='py-3 px-4'>Order Status</th>
            <th scope='col' className='py-3 px-4 rounded-r-lg'>Active</th>
        </tr>
        </thead>

        <tbody>
            {
                recentOrder.map((d, i) => <tr key={i} className='border-b border-slate-50 last:border-none hover:bg-slate-50/60 transition-colors'>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap text-slate-700'>#{d._id}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap text-slate-700'>₹{d.price}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap capitalize text-slate-600'>{d.payment_status}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap capitalize text-slate-600'>{d.delivery_status}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <Link className='text-[#2563EB] hover:underline' to={`/seller/dashboard/order/details/${d._id}`}>View</Link> </td>
            </tr> )
            }


        </tbody>

    </table>

    </div>

        </div>




             
        </div>
    );
};

export default SellerDashboard;
