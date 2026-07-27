import React, { useEffect, useState } from 'react';
import { FaList, FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
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
        { to: '/contact', label: 'Contact Us', match: '/contact' },
    ]

    return (
        <>
        <div className='w-full bg-[#1e293b] sticky top-0 z-[999] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] flex justify-center'>

            {/* Main bar: logo, merged search + category, account, wishlist, cart */}
            <div className='w-full max-w-[1440px] pl-2 pr-10'>
                <div className='h-[80px] md-lg:h-auto flex md-lg:flex-wrap justify-between items-center md-lg:py-3 gap-6 md-lg:gap-4'>

                    <div className='flex items-center gap-3 shrink-0'>
                        <Link to='/' className='block'>
                            <div className='inline-block bg-[#1e293b] rounded-lg px-3 py-2'>
                                <img
                                    className='h-10 md-lg:h-9 w-auto object-contain'
                                    src="/images/logo.png"
                                    alt="logo"
                                />
                            </div>
                        </Link>
                        <div title="Menu" className='justify-center items-center w-[36px] h-[36px] bg-white text-slate-600 border border-slate-300 rounded-lg cursor-pointer lg:hidden md-lg:flex xl:hidden hidden hover:border-[#A3C2EA] hover:text-[#A3C2EA] transition-colors' onClick={() => setShowShidebar(false)}>
                            <span> <FaList/> </span>
                        </div>
                        <ul className='flex items-center gap-6 pl-4 ml-2 border-l border-slate-600 text-sm font-semibold uppercase tracking-wide md-lg:hidden'>
                            {
                                navLinks.map((n, i) => (
                                    <li key={i}>
                                        <Link to={n.to} className={`relative py-2 block transition-colors after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-[#A3C2EA] after:transition-all ${pathname === n.match ? 'text-[#A3C2EA] after:w-full' : 'text-slate-100 hover:text-[#A3C2EA] after:w-0 hover:after:w-full'}`}>{n.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Merged category + search, Amazon style */}
                    <div className='flex-grow max-w-[720px] md-lg:order-3 md-lg:max-w-none md-lg:w-full'>
                        <div className='flex bg-white rounded-md h-[44px] items-center overflow-hidden w-full ring-1 ring-transparent focus-within:ring-2 focus-within:ring-[#A3C2EA] transition-all'>
                            <select
                                title="Select category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='h-full bg-slate-100 text-slate-700 text-xs font-semibold pl-3 pr-2 outline-none border-r border-slate-300 max-w-[130px] sm:max-w-[80px] cursor-pointer'
                            >
                                <option value=''>All Categories</option>
                                {
                                    categorys.map((c,i) => <option key={i} value={c.name}>{c.name}</option>)
                                }
                            </select>
                            <input
                                className='flex-grow h-full px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 min-w-0'
                                onChange={(e)=> setSearchValue(e.target.value)}
                                type='text'
                                placeholder='What do you need'
                            />
                            <button title="Search" onClick={search} className='h-full px-5 bg-[#A3C2EA] hover:bg-[#84A9DD] text-slate-800 flex items-center justify-center transition-colors shrink-0'>
                                <FaSearch size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Account / Wishlist / Cart, Amazon style */}
                    <div className='flex items-center gap-6 md-lg:gap-4 shrink-0 md-lg:order-2 md-lg:ml-auto'>

                        {
                            userInfo ? (
                                <Link to='/dashboard' className='flex flex-col leading-tight text-white hover:text-[#A3C2EA] transition-colors'>
                                    <span className='text-[11px] text-slate-300'>Hello, {userInfo.name.split(' ')[0]}</span>
                                    <span className='text-sm font-semibold flex items-center gap-1'>Account <IoIosArrowDown size={11}/></span>
                                </Link>
                            ) : (
                                <Link title="Login" to='/login' className='px-4 py-2 rounded-md bg-[#A3C2EA] hover:bg-[#84A9DD] transition-colors text-slate-800 text-sm font-semibold shrink-0'>
                                    Login
                                </Link>
                            )
                        }

                        <Link title="Wishlist" to={userInfo ? '/dashboard/my-wishlist' : '/login'} className='relative flex flex-col items-center text-white hover:text-[#A3C2EA] transition-colors'>
                            <span className='relative text-xl'>
                                <FaHeart />
                                {
                                    wishlist_count !== 0 && <span className='absolute -top-2 -right-2 bg-orange-400 text-slate-900 text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center ring-2 ring-[#1e293b]'>{wishlist_count}</span>
                                }
                            </span>
                            <span className='text-[11px] font-semibold mt-0.5'>Wishlist</span>
                        </Link>

                        <div title="Cart" onClick={redirect_card_page} className='relative flex flex-col items-center text-white hover:text-[#A3C2EA] transition-colors cursor-pointer'>
                            <span className='relative text-xl'>
                                <FaCartShopping />
                                {
                                    card_product_count !== 0 && <span className='absolute -top-2 -right-2 bg-orange-400 text-slate-900 text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center ring-2 ring-[#1e293b]'>{card_product_count}</span>
                                }
                            </span>
                            <span className='text-[11px] font-semibold mt-0.5'>Cart</span>
                        </div>

                    </div>

                </div>
            </div>

        </div>

        {/* Mobile sidebar */}
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
                            userInfo ? (
                                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-slate-800' to='/dashboard'>
                                    Hello, {userInfo.name.split(' ')[0]}
                                </Link>
                            ) : (
                                <Link title="Login" to='/login' className='px-4 py-2 rounded-md bg-[#A3C2EA] text-slate-800 text-sm font-semibold'>
                                    Login
                                </Link>
                            )
                        }
                    </div>

                    <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase gap-1 w-full'>
                        {
                            navLinks.map((n, i) => (
                                <li key={i} className='w-full border-b border-slate-100 last:border-none'>
                                    <Link to={n.to} className={`py-3 block ${pathname === n.match ?  'text-[#A3C2EA]' : 'text-slate-600' } `}>{n.label}</Link>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>

        </>
    );
};

export default Header;