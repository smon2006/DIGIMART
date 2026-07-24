import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login,messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

    const navigate = useNavigate()
    const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [state, setState] = useState({ 
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
 
    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        if (userInfo) {
            navigate('/')
        }
    },[successMessage,errorMessage])

    return (
        <div>
             {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader/>
                </div>
            }
            <Header/>
    <div className='bg-slate-50 py-14 md-lg:py-8'>
        <div className='w-full justify-center items-center px-4'>
            <div className='grid grid-cols-2 md-lg:grid-cols-1 w-[60%] md-lg:w-[92%] mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
                <div className='px-10 py-10 sm:px-6 sm:py-8'>
            <h2 className='text-left w-full text-2xl text-slate-800 font-bold mb-1'>Welcome Back </h2> 
            <p className='text-slate-500 text-sm mb-6'>Login to your account to continue</p>

    <div>
        <form onSubmit={login} className='text-slate-600'>
    
    <div className='flex flex-col gap-1 mb-4'>
        <label className='text-sm font-medium text-slate-700' htmlFor="email">Email</label>
        <input onChange={inputHandle} value={state.email}  className='w-full px-4 py-3 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg transition-all text-sm' type="email" name="email" id="email" placeholder='Email' required />
    </div>

    <div className='flex flex-col gap-1 mb-5'>
        <label className='text-sm font-medium text-slate-700' htmlFor="password">Password</label>
        <div className='relative'>
            <input onChange={inputHandle} value={state.password}  className='w-full px-4 py-3 pr-11 border border-slate-300 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg transition-all text-sm' type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='Password' required />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600' tabIndex={-1}>
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
        </div>
        <Link className='text-xs font-semibold text-[#2563EB] hover:underline self-end mt-1' to='/forgot-password'>Forgot password?</Link>
    </div>

    <button className='px-8 w-full py-3 bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors font-semibold text-white rounded-lg'>Login</button>
 
        </form>
    </div>    

    <div className='text-center text-slate-500 text-sm pt-1'>
        <p>Don't Have An Account ? <Link className='text-[#2563EB] font-semibold hover:underline' to='/register'> Register</Link> </p>
    </div> 

     <a target='_blank' href="http://localhost:3001/login">
     <div className='px-8 w-full py-2.5 mt-4 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 rounded-lg flex justify-center items-center gap-2 mb-3 text-sm font-medium'>
            Login As a Seller
     </div>
     </a>
 
     <a target='_blank' href="http://localhost:3001/register">
     <div className='px-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 rounded-lg flex justify-center items-center gap-2 mb-3 text-sm font-medium'>
            Register As a Seller
     </div>
     </a>

            </div> 

        <div className='w-full h-full md-lg:hidden'>
            <img className='w-full h-full object-cover' src="/images/login.jpg" alt="" />
         </div>    

         </div>
        </div>
    </div>        
            
            <Footer/>
        </div>
    );
};

export default Login;