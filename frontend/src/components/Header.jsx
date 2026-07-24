import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaList, FaLock, FaUser, FaSearch } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io"; 
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer';

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categorys} = useSelector(state => state.home) 
    const {userInfo} = useSelector(state => state.auth) 
    const {card_product_count,wishlist_count} = useSelector(state => state.card) 

    const {pathname} = useLocation()
     
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
     
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }

    const redirect_card_page = () => {
        if (userInfo) {
            navigate('/card')
        } else {
            navigate('/login')
        }
    } 

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }  
    },[userInfo])

    const navLinks = [
        { to: '/', label: 'Home', match: '/' },
        { to: '/shops', label: 'Shop', match: '/shops' },
        { to: '/blog', label: 'Blog', match: '/blog' },
        { to: '/about', label: 'About Us', match: '/about' },
        { to: '/contact', label: 'Contact Us', match: '/contact' },
    ]

    return (
        <>
        <div className='w-full bg-[#38464e] sticky top-0 z-[999] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)]'>
            <div className='header-top bg-[#1e293b] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[42px] text-white'>
                        <ul className='flex justify-start items-center gap-8 font-medium text-slate-300'>
                            <li title="Email" className='flex relative justify-center items-center gap-2 text-xs after:absolute after:h-[14px] after:w-[1px] after:bg-slate-600 after:-right-[16px]'>
                                <span className='text-sm'><MdEmail /></span>
                                <span>support@digimart.com</span>
                            </li>

                            <li title="Phone" className='flex relative justify-center items-center gap-2 text-xs'>
                                <span className='text-sm'><IoMdPhonePortrait  /></span>
                                <span>+1 (555) 010-2029</span>
                            </li> 
                        </ul>

                        <div>
                            <div className='flex justify-center items-center gap-8'>
                                <div className='flex justify-center items-center gap-4 text-slate-300'>
                                    <a href="https://www.linkedin.com/in/shrestha-mondal-cse/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className='hover:text-white transition-colors'><FaLinkedin size={13} /></a>
                                    <a href="https://github.com/smon2006/DIGIMART" target="_blank" rel="noopener noreferrer" title="GitHub" className='hover:text-white transition-colors'><FaGithub size={13} /> </a> 
                                </div>

        {
            userInfo ? <Link title="My Account" className='flex cursor-pointer justify-center items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors' to='/dashboard'>
                <span> <FaUser/> </span>
                <span> {userInfo.name} </span>
                 </Link> : <Link title="Login" to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors'>
                <span> <FaLock /> </span>
                <span>Login </span>
                 </Link>
        }
 
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>

        <div className='w-white'>
         <div className='w-[85%] lg:w-[90%] mx-auto'>
            <div className='h-[86px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
              
                <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                    <div className='flex justify-between items-center'>
 
                <Link to='/' className='block'>
                    <img
                        className='h-14 md-lg:h-12 w-auto object-contain'
                        src="/images/logo.png"
                        alt="logo"
                    />
                </Link>
                <div title="Menu" className='justify-center items-center w-[36px] h-[36px] bg-white text-slate-600 border border-slate-300 rounded-lg cursor-pointer lg:hidden md-lg:flex xl:hidden hidden hover:border-[#2563EB] hover:text-[#2563EB] transition-colors' onClick={() => setShowShidebar(false)}>
                    <span> <FaList/> </span>
                </div>
                </div> 
                </div> 
 
            <div className='md:lg:w-full w-9/12'>
                <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                    <ul className='flex justify-start items-start gap-8 text-[13px] font-bold uppercase tracking-wide md-lg:hidden'>
                        {
                            navLinks.map((n, i) => (
                                <li key={i}>
                                    <Link to={n.to} className={`relative py-2 block transition-colors after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-[#2563EB] after:transition-all ${pathname === n.match ? 'text-[#2563EB] after:w-full' : 'text-slate-100 hover:text-[#2563EB] after:w-0 hover:after:w-full'}`}>{n.label}</Link>
                                </li>
                            ))
                        }
                    </ul>

                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                    <div className='flex justify-center gap-3'>
       
  <div title="Wishlist" onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login') } className='relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-100 hover:bg-[#2563EB] group transition-colors duration-200'>
                            <span className='text-lg text-slate-600 group-hover:text-white transition-colors'><FaHeart /></span>

            {
                wishlist_count !== 0 && <div className='w-[18px] h-[18px] absolute bg-red-500 rounded-full text-white text-[11px] font-semibold flex justify-center items-center -top-[2px] -right-[2px] ring-2 ring-[#38464e]'>
                {wishlist_count}
                </div>
            }                  
                     
                 </div>

                        <div title="Cart" onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-100 hover:bg-[#2563EB] group transition-colors duration-200'>
                            <span className='text-lg text-slate-600 group-hover:text-white transition-colors'><FaCartShopping  /></span>
            
                {
                    card_product_count !== 0 && <div className='w-[18px] h-[18px] absolute bg-red-500 rounded-full text-white text-[11px] font-semibold flex justify-center items-center -top-[2px] -right-[2px] ring-2 ring-[#38464e]'>
                        {
                            card_product_count
                        }
                     </div> 
                } 
                               
                        </div> 
                    </div> 
                </div> 

                </div> 
            </div>

            </div> 
            </div>
        </div>

    <div className='hidden md-lg:block'>
        <div onClick={()=> setShowShidebar(true)} className={`fixed duration-200 transition-all ${showShidebar ? 'invisible opacity-0' : 'visible opacity-100'} hidden md-lg:block w-screen h-screen bg-black/50 top-0 left-0 z-20 `}>  
        </div> 

        <div className={`w-[300px] z-[9999] transition-all duration-200 fixed ${showShidebar ? '-left-[300px]' : 'left-0 top-0'} overflow-y-auto bg-white h-screen py-6 px-8 shadow-2xl`}>
                <div className='flex justify-start flex-col gap-6'>
                <Link to='/'>
                    <div className='inline-block bg-[#1e293b] rounded-lg px-3 py-2'>
                        <img
                            className='h-8 w-auto object-contain'
                            src="/images/logo.png"
                            alt="logo"
                        />
                    </div>
                </Link>
    <div className='flex justify-start items-center gap-10'>
        {
            userInfo ? <Link title="My Account" className='flex cursor-pointer justify-center items-center gap-2 text-sm text-slate-800' to='/dashboard'>
                <span> <FaUser/> </span>
                <span>{ userInfo.name }</span>
                 </Link> : <Link title="Login" className='flex cursor-pointer justify-center items-center gap-2 text-sm text-slate-800' to='/login'>
                <span> <FaLock /> </span>
                <span>Login </span>
                 </Link>
        } 

    </div>

    <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase gap-1 w-full'>
                        {
                            navLinks.map((n, i) => (
                                <li key={i} className='w-full border-b border-slate-100 last:border-none'>
                                    <Link to={n.to} className={`py-3 block ${pathname === n.match ?  'text-[#2563EB]' : 'text-slate-600' } `}>{n.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
    <div className='flex justify-start items-center gap-4 text-slate-500'>
                    <a href="https://www.linkedin.com/in/shrestha-mondal-cse/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className='hover:text-[#2563EB] transition-colors'><FaLinkedin /></a>
                    <a href="https://github.com/smon2006/DIGIMART" target="_blank" rel="noopener noreferrer" title="GitHub" className='hover:text-[#2563EB] transition-colors'><FaGithub /> </a> 
        </div>

        <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
        <div title="Phone" className='w-[48px] h-[48px] rounded-full flex bg-slate-100 text-[#2563EB] justify-center items-center '>
        <span><FaPhoneAlt /></span>
        </div>
        <div className='flex justify-end flex-col gap-1'>
            <h2 className='text-sm font-medium text-slate-700'>+1 (555) 010-2029</h2>
            <span className='text-xs text-slate-500'>Support 24/7</span> 
        </div>
        </div>

        <ul className='flex flex-col justify-start items-start gap-3 text-slate-600'>
            <li title="Email" className='flex justify-start items-center gap-2 text-sm'>
             <span><MdEmail /></span>
             <span>support@digimart.com</span>
            </li>

        </ul> 

                </div> 
            </div>  
    </div>

    <div className='w-[85%] lg:w-[90%] mx-auto'>
        <div className='flex w-full flex-wrap md-lg:gap-8 pb-4'>
            <div className='w-3/12 md-lg:w-full'>
                <div className='bg-white relative rounded-t-lg'>
                   <div title="Browse categories" onClick={() => setCategoryShow(!categoryShow) } className='h-[48px] rounded-t-lg bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-semibold text-sm cursor-pointer'>
            <div className='flex justify-center items-center gap-3'>
                <span><FaList/></span>
                <span>All Category </span>
            </div>
            <span className={`pt-1 transition-transform duration-300 ${categoryShow ? '' : 'rotate-180'}`}><IoIosArrowDown /></span>
                    </div>

        <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-y-auto overflow-x-hidden transition-all md-lg:relative duration-500 absolute z-[999] bg-white w-full border border-slate-200 rounded-b-lg shadow-xl`}>
            <ul className='py-2 text-slate-600 font-medium'>
                {
                    categorys.map((c,i) => {
                        return (
                         <li key={i} className='flex justify-start items-center gap-3 px-[20px] py-[8px] hover:bg-slate-50 transition-colors'>
                            <img src={c.image} className='w-[28px] h-[28px] rounded-full overflow-hidden object-cover' alt="" />
                            <Link to={`/products?category=${c.name}`} className='text-sm block hover:text-[#2563EB] transition-colors'>{c.name}</Link>
                         </li>
                        )
                    })
                }
            </ul>

        </div>

                </div>
            </div>

        <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
            <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                <div className='w-8/12 md-lg:w-full'>
                    <div className='flex bg-white border border-slate-300 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20 rounded-full h-[48px] items-center relative gap-6 transition-all overflow-hidden'>
                        <div className='relative after:absolute after:h-[22px] after:w-[1px] after:bg-slate-300 after:-right-[15px] md:hidden pl-5'>
                        <select onChange={(e) => setCategory(e.target.value)} className='w-[140px] text-slate-600 text-sm font-semibold bg-transparent px-2 h-full outline-0 border-none' name="" id="">
                            <option value="">All Categories</option>
                            {
                                categorys.map((c, i) => <option key={i} value={c.name}> {c.name} </option> )
                            }
                        </select>
                        </div>
                        <input className='w-full relative bg-transparent text-slate-600 text-sm outline-0 pr-3 h-full placeholder:text-slate-400' onChange={(e)=> setSearchValue(e.target.value)} type="text" name='' id='' placeholder='What do you need' />
                        <button title="Search" onClick={search} className='bg-[#2563EB] hover:bg-[#1d4ed8] right-0 absolute px-7 h-full font-semibold text-sm uppercase text-white flex items-center gap-2 transition-colors rounded-r-full'>
                            <FaSearch size={13} />
                            <span className='md-lg:hidden'>Search</span>
                        </button>
                    </div> 
                </div>

                <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>

                <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
        <div title="Phone" className='w-[46px] h-[46px] rounded-full flex bg-slate-100 text-[#2563EB] justify-center items-center '>
        <span><FaPhoneAlt /></span>
        </div>
        <div className='flex justify-end flex-col gap-0.5'>
            <h2 className='text-sm font-semibold text-slate-100'>+1 (555) 010-2029</h2>
            <span className='text-xs text-slate-300'>Support 24/7</span> 
        </div>
        </div>

                </div>

            </div>
            </div>    

        </div> 
    </div>

        </div>
        </>
    );
};

export default Header;