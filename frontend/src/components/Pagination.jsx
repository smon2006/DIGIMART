import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({pageNumber,setPageNumber,totalItem,parPage,showItem}) => {

    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage
     
    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {

        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li key={i} onClick={()=>setPageNumber(i)} className={` ${pageNumber === i ? 'bg-[#F26627] shadow-lg shadow-[#F26627]/30 text-white' : 'bg-white border border-slate-200 hover:bg-[#F26627] hover:border-[#F26627] hover:text-white text-slate-600'} w-[36px] h-[36px] rounded-full flex justify-center items-center cursor-pointer transition-colors text-sm font-medium `}>
                    {i}                    
                </li>
            ) 
        }
        return btns
    }

    return (
        <ul className='flex justify-center w-full gap-2'>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[36px] h-[36px] rounded-full flex justify-center items-center bg-white border border-slate-200 hover:bg-[#F26627] hover:border-[#F26627] hover:text-white text-slate-600 cursor-pointer transition-colors'>
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[36px] h-[36px] rounded-full flex justify-center items-center bg-white border border-slate-200 hover:bg-[#F26627] hover:border-[#F26627] hover:text-white text-slate-600 cursor-pointer transition-colors'>
                    <MdOutlineKeyboardDoubleArrowRight  />
                </li>
            }

        </ul>
    )

};

export default Pagination;