import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const ForgotPassword = () => {

    const navigate = useNavigate()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        email: '',
        new_password: '',
        confirm_password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        if (state.new_password !== state.confirm_password) {
            toast.error("Passwords don't match")
            return
        }
        if (state.new_password.length < 6) {
            toast.error("Password should be at least 6 characters")
            return
        }
        dispatch(forgot_password({ email: state.email, new_password: state.new_password }))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/login')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    return (
        <div className='min-h-screen bg-[#4B7089]'>
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#4B708933] z-[999]'>
                    <FadeLoader/>
                </div>
            }
            <Header/>
    <div className='bg-[#FDD7BF] py-14 md-lg:py-8'>
        <div className='w-full justify-center items-center px-4'>
            <div className='grid grid-cols-2 md-lg:grid-cols-1 w-[60%] md-lg:w-[92%] mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
                <div className='px-10 py-10 sm:px-6 sm:py-8'>
            <h2 className='text-left w-full text-2xl text-slate-800 font-bold mb-1'>Reset Your Password</h2>
            <p className='text-slate-500 text-sm mb-6'>Enter your account email and choose a new password</p>

    <div>
        <form onSubmit={submit} className='text-slate-600'>

    <div className='flex flex-col gap-1 mb-4'>
        <label className='text-sm font-medium text-slate-700' htmlFor="email">Email</label>
        <input onChange={inputHandle} value={state.email} className='w-full px-4 py-3 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg transition-all text-sm' type="email" name="email" id="email" placeholder='Email' required />
    </div>

    <div className='flex flex-col gap-1 mb-4'>
        <label className='text-sm font-medium text-slate-700' htmlFor="new_password">New Password</label>
        <input onChange={inputHandle} value={state.new_password} className='w-full px-4 py-3 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg transition-all text-sm' type="password" name="new_password" id="new_password" placeholder='New Password' required />
    </div>

    <div className='flex flex-col gap-1 mb-5'>
        <label className='text-sm font-medium text-slate-700' htmlFor="confirm_password">Confirm New Password</label>
        <input onChange={inputHandle} value={state.confirm_password} className='w-full px-4 py-3 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg transition-all text-sm' type="password" name="confirm_password" id="confirm_password" placeholder='Confirm New Password' required />
    </div>

    <button className='px-8 w-full py-3 bg-[#F26627] hover:bg-[#C24A16] transition-colors font-semibold text-white rounded-lg'>Reset Password</button>

        </form>
    </div>

    <div className='text-center text-slate-500 text-sm pt-4'>
        <p>Remembered it? <Link className='text-[#F26627] font-semibold hover:underline' to='/login'> Sign In</Link> </p>
    </div>

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

export default ForgotPassword;