import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cardReducer'

const Dashboard = () => {
    const [filterShow, setFilterShow] =  useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const logout = async () => {
        try {
            const {data} = await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const navItems = [
        { to: '/dashboard', icon: <IoIosHome />, label: 'Dashboard', exact: true },
        { to: '/dashboard/my-orders', icon: <FaBorderAll/>, label: 'My Orders' },
        { to: '/dashboard/my-wishlist', icon: <FaHeart/>, label: 'Wishlist' },
        { to: '/dashboard/chat', icon: <IoChatbubbleEllipsesSharp/>, label: 'Chat' },
        { to: '/dashboard/change-password', icon: <RiLockPasswordLine/>, label: 'Change Password' },
    ]

    return (
        <div>
           <Header/>
           <div className='bg-slate-50 py-6'>
                <div className='w-[90%] mx-auto md-lg:block hidden mb-3'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-2.5 px-4 bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white rounded-lg font-semibold text-sm flex items-center gap-2'><FaList/> Menu</button>
                    </div> 
                </div>

        <div className='h-full mx-auto'>
            <div className='flex md-lg:w-[90%] mx-auto relative'>
                <div className={`rounded-2xl border border-slate-200 shadow-sm z-50 md-lg:absolute transition-all duration-200 ${filterShow ? 'md-lg:left-0' : 'md-lg:-left-[360px]'} left-0 w-[270px] bg-white h-fit`}>

            <ul className='py-3 text-slate-600 px-3 flex flex-col gap-1'> 
                {
                    navItems.map((n,i) => {
                        const active = n.exact ? pathname === n.to : pathname.startsWith(n.to)
                        return (
                <li key={i}>
                    <Link to={n.to} className={`flex justify-start items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-[#2563EB]' : 'hover:bg-slate-50 text-slate-600'}`}>
                        <span className='text-lg'>{n.icon}</span>
                        <span>{n.label}</span>
                    </Link>
                </li>
                        )
                    })
                }
                <li onClick={logout} className='flex justify-start items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-50 hover:text-red-500 text-slate-600 transition-colors mt-1 border-t border-slate-100 pt-3'>
            <span className='text-lg'><IoMdLogOut/></span>
            <span>Logout</span>
                </li> 

            </ul> 
                </div>

                <div className='w-[calc(100%-270px)] md-lg:w-full'>
                    <div className='ml-6 md-lg:ml-0'>
                        <Outlet/>
                    </div>
                </div>
                
            </div>
        </div>        

           </div>

           <Footer/>
        </div>
    );
};

export default Dashboard;
