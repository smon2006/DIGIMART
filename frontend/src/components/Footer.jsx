import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

const Footer = () => {

    const navigate = useNavigate() 
    const {userInfo} = useSelector(state => state.auth) 
    const {card_product_count,wishlist_count} = useSelector(state => state.card) 

    return (
        <>
        <footer className='bg-[#1e293b] shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.25)] relative z-10'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b border-white/10 py-16 md-lg:pb-10 sm:pb-6 gap-y-10'>
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex flex-col items-start gap-4'>
                        <img
                            className='h-14 w-auto object-contain self-start'
                            src="/images/logo.png"
                            alt="logo"
                        />
                        <ul className='flex flex-col gap-2.5 text-slate-300 text-sm'>
                            <li>128 Maple Street, Springfield, IL 62704</li>
                            <li>Phone : +1 (555) 010-2029</li>
                            <li>Email : support@digimart.com</li>
                        </ul> 
                    </div> 
                </div>

                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                <h2 className='font-bold text-base mb-5 text-white uppercase tracking-wide relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-8 after:h-[2px] after:bg-[#2563EB]'>Useful Links</h2>
                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                    <ul className='flex flex-col gap-2.5 text-slate-300 text-sm font-medium'>
                        <li>
                            <Link to='/about' className='hover:text-white hover:pl-1 transition-all duration-200'>About Us </Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='hover:text-white hover:pl-1 transition-all duration-200'>Delivery Information </Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='hover:text-white hover:pl-1 transition-all duration-200'>Privacy Policy </Link>
                        </li>
                        <li>
                            <Link to='/blog' className='hover:text-white hover:pl-1 transition-all duration-200'>Blogs  </Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='hover:text-white hover:pl-1 transition-all duration-200'>Our Service </Link>
                        </li>
                    </ul>

                </div>
                        </div> 
                    </div> 
                </div>

            <div className='w-4/12 lg:w-full lg:mt-6'>
                <div className='w-full flex flex-col justify-start gap-4'>
                    <h2 className='font-bold text-base mb-1 text-white uppercase tracking-wide relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-8 after:h-[2px] after:bg-[#2563EB]'>Join Our Shop</h2>
                    <span className='text-slate-300 text-sm leading-relaxed'>Get email updates about your latest and shop special offers</span>
                    <div className='h-[48px] w-full bg-white rounded-full relative overflow-hidden ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-[#2563EB] transition-all'>
                        <input className='h-full bg-transparent w-full pl-5 pr-[110px] outline-0 text-sm text-slate-700 placeholder:text-slate-400' type="text" placeholder='Enter Your Email' />
                        <button title="Subscribe" className='h-[38px] absolute right-[5px] top-[5px] rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white uppercase px-5 font-bold text-xs'>Subscribe</button>  
                     </div> 
                     <ul className='flex justify-start items-center gap-3 mt-1'>
                        <li>
                            <a title="LinkedIn" className='w-[38px] h-[38px] hover:bg-[#2563EB] hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center bg-white text-slate-700 hover:text-white rounded-full shadow-sm' href="https://www.linkedin.com/in/shrestha-mondal-cse/" target="_blank" rel="noopener noreferrer"><FaLinkedin/> </a>
                        </li>
                        <li>
                            <a title="GitHub" className='w-[38px] h-[38px] hover:bg-[#2563EB] hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center bg-white text-slate-700 hover:text-white rounded-full shadow-sm' href="https://github.com/smon2006/DIGIMART" target="_blank" rel="noopener noreferrer"><FaGithub/> </a>
                        </li>

                     </ul>
                </div> 
            </div> 

            </div>

            <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-400 text-sm mx-auto py-5 text-center'>
                <span>Copyright © 2026 All Rights Reserved</span>
            </div>

    <div className='hidden fixed md-lg:block w-[54px] h-[118px] bottom-4 right-3 bg-white rounded-full p-2 shadow-2xl z-50'>
        <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
        <div title="Cart" onClick={() => navigate(userInfo ? '/card' : '/login') }  className='relative flex justify-center items-center cursor-pointer w-[38px] h-[38px] rounded-full bg-slate-100 hover:bg-[#FBBF24] group transition-colors'>
            <span className='text-lg text-slate-600 group-hover:text-slate-900 transition-colors'><FaCartShopping/></span>
            {
                card_product_count !== 0 && <div className='w-[19px] h-[19px] absolute bg-red-500 rounded-full text-white text-[11px] font-semibold flex justify-center items-center -top-[3px] -right-[5px] ring-2 ring-white'>
                    {
                        card_product_count
                    }
                </div>
            }
            
        </div>

        <div title="Wishlist" onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login') } className='relative flex justify-center items-center cursor-pointer w-[38px] h-[38px] rounded-full bg-slate-100 hover:bg-[#FBBF24] group transition-colors'>
            <span className='text-lg text-slate-600 group-hover:text-slate-900 transition-colors'><FaHeart/></span>
            {
                wishlist_count !== 0 && <div className='w-[19px] h-[19px] absolute bg-red-500 rounded-full text-white text-[11px] font-semibold flex justify-center items-center -top-[3px] -right-[5px] ring-2 ring-white'>
                    {
                       wishlist_count 
                    }
                </div>
            }
            
        </div>

        </div>
    </div>

        </footer>
        </>
    );
};

export default Footer;