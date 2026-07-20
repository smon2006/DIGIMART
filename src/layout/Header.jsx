import React from 'react';
import { FaList, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = ({showSidebar, setShowSidebar}) => {

  const {userInfo } = useSelector(state => state.auth)

    return (
        <div className='fixed top-0 left-0 w-full py-4 px-3 lg:px-7 z-30'>
          <div className='ml-0 lg:ml-[260px] rounded-xl h-[65px] flex justify-between items-center bg-[#1e293b] border border-slate-700/60 shadow-sm px-5 transition-all'>

        <div onClick={() => setShowSidebar(!showSidebar)} className='w-[38px] flex lg:hidden h-[38px] rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-600/30 justify-center items-center cursor-pointer text-white transition-colors' >
          <span><FaList size={14}/></span>
        </div>

        <div className='hidden md:flex items-center relative w-[320px]'>
          <FaSearch className='absolute left-3 text-slate-400' size={13} />
          <input className='pl-9 pr-3 py-2.5 w-full outline-none border border-slate-600/60 bg-slate-800 rounded-lg text-sm text-slate-200 placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-slate-800 transition-all' type="text" name='search' placeholder='Search...' />
        </div>

        <div className='flex justify-center items-center gap-3 relative'>
              <div className='flex justify-center items-center flex-col text-end'>
          <h2 className='text-sm font-bold text-white'>{ userInfo.name }</h2>
          <span className='text-xs w-full font-medium text-slate-400 capitalize'>{ userInfo.role }</span>
              </div>

              {
                userInfo.role === 'admin' ? <img className='w-[42px] h-[42px] rounded-full object-cover ring-2 ring-slate-600' src="http://localhost:3000/images/admin.jpg" alt="" />  : <img className='w-[42px] h-[42px] rounded-full object-cover ring-2 ring-slate-600' src={userInfo.image} alt="" />
              }

        </div>


          </div>
        </div>
    );
};

export default Header;
