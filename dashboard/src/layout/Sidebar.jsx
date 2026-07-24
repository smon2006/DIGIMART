import React, { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/Reducers/authReducer';
import logo from '../assets/digimart-logo-outlined.png'

const Sidebar = ({showSidebar, setShowSidebar}) => {

    const dispatch = useDispatch()
    const { role } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const {pathname} = useLocation()
    const [allNav,setAllNav] = useState([])
    useEffect(() => {
        const navs = getNav(role)
        setAllNav(navs)
    },[role])

    return (
        <div>
            <div onClick={()=> setShowSidebar(false)} className={`fixed duration-200 ${!showSidebar ? 'invisible opacity-0' : 'visible opacity-100'} w-screen h-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 z-40 transition-opacity`} >
            </div>

    <div className={`w-[260px] fixed bg-white z-50 top-0 h-screen shadow-2xl border-r border-slate-200 transition-all flex flex-col ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'} `}>
        <div className='h-[70px] flex justify-center items-center border-b border-slate-100 shrink-0'>
            <Link to='/' className='w-[190px] h-[56px] flex items-center justify-center'>
                <img className='w-full h-full object-contain' src={logo} alt="logo" />
            </Link>
        </div>

        <div className='px-[14px] py-4 flex-1 overflow-y-auto'>
            <ul className='flex flex-col gap-1'>
                {
                    allNav.map((n,i) =><li key={i}>
                       <Link to={n.path} className={`${pathname === n.path ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' } px-[14px] py-[10px] rounded-lg flex justify-start items-center gap-3 transition-all duration-200 w-full text-sm font-medium`} >
                        <span className='text-base'>{n.icon}</span>
                        <span>{n.title}</span>
                        </Link>

                    </li> )
                }

            </ul>
        </div>

        <div className='px-[14px] py-4 border-t border-slate-100 shrink-0'>
            <button onClick={() => dispatch(logout({navigate,role }))} className='text-slate-500 hover:bg-red-50 hover:text-red-500 px-[14px] py-[10px] rounded-lg flex justify-start items-center gap-3 transition-all duration-200 w-full text-sm font-medium'>
                <span className='text-base'><BiLogOutCircle /></span>
                <span>Logout</span>
            </button>
        </div>

    </div>

        </div>
    );
};

export default Sidebar;