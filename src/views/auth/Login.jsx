import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { seller_login,messageClear } from '../../store/Reducers/authReducer';

const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {loader,errorMessage,successMessage} = useSelector(state=>state.auth)

    const [state, setState] = useState({ 
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_login(state))
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            navigate('/') 
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        
    },[successMessage,errorMessage])

    return (
        <div className='min-w-screen min-h-screen bg-slate-50 flex justify-center items-center px-4' >
          <div className='w-full max-w-[380px]'>
            <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl'>
                <h2 className='text-lg font-bold text-slate-800'>Welcome to the Seller Panel</h2>
                <p className='text-sm text-slate-400 mt-1 mb-6'>Sign in to manage your shop</p>

    <form onSubmit={submit}>
         
        <div className='flex flex-col w-full gap-1.5 mb-4'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="email">Email</label>
            <input onChange={inputHandle} value={state.email}  className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="email" name='email' placeholder='you@example.com' id='email' required />

        </div>

        <div className='flex flex-col w-full gap-1.5 mb-5'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="password">Password</label>
            <input onChange={inputHandle} value={state.password}  className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="password" name='password' placeholder='••••••••' id='password' required />
            <Link className='text-xs font-semibold text-[#2563EB] hover:underline self-end mt-1' to="/forgot-password">Forgot password?</Link>
        </div>
  
        <button disabled={loader ? true : false}  className='bg-[#2563EB] hover:bg-[#1d4ed8] w-full shadow-md shadow-blue-600/30 transition-colors text-white font-semibold rounded-lg px-7 py-2.5 mb-4'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign In'
            } 
            </button>

        <div className='flex items-center mb-4 gap-3 justify-center text-sm text-slate-500'>
            <p>Don't have an account? <Link className='font-semibold text-[#2563EB] hover:underline' to="/register">Sign Up</Link> </p> 
        </div>

        <div className='w-full flex justify-center items-center mb-4'>
            <div className='w-[45%] bg-slate-200 h-[1px]'></div>
            <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-0.5 text-xs text-slate-400'>Or</span>
            </div>
            <div className='w-[45%] bg-slate-200 h-[1px] '></div>
        </div>

        <div className='flex justify-center items-center gap-3'>
            <div className='w-[135px] h-[38px] flex rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-sm justify-center cursor-pointer items-center overflow-hidden text-red-500 transition-colors'>
            <span><FaGoogle /></span>
             </div>

             <div className='w-[135px] h-[38px] flex rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-sm justify-center cursor-pointer items-center overflow-hidden text-blue-600 transition-colors'>
            <span><FaFacebook /></span>
             </div>

        </div>

    </form>
 
            </div>
            </div>  
            
        </div>
    );
};

export default Login;
