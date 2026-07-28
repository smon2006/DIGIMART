import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const PageHeader = ({ title, crumbs = [] }) => {
    const allCrumbs = [{ to: '/', label: 'Home' }, ...crumbs];
    return (
        <div className='w-full bg-[#9BD7D1] border-b border-slate-300/60'>
            <div className='w-[85%] lg:w-[90%] mx-auto py-6 md-lg:py-5 sm:py-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl md-lg:text-xl font-bold text-slate-800 truncate'>{title}</h1>
                    <ul className='flex flex-wrap items-center gap-2 text-sm text-slate-600'>
                        {
                            allCrumbs.map((c, i) => (
                                <li key={i} className='flex items-center gap-2'>
                                    {i !== 0 && <span className='text-slate-500 text-xs'><IoIosArrowForward /></span>}
                                    {
                                        c.to && i !== allCrumbs.length - 1
                                            ? <Link to={c.to} className='hover:text-[#325D79] transition-colors'>{c.label}</Link>
                                            : <span className={i === allCrumbs.length - 1 ? 'text-slate-700 font-medium truncate max-w-[220px] sm:max-w-[140px]' : ''}>{c.label}</span>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;