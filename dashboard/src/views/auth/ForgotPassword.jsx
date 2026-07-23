import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { forgot_password, messageClear } from '../../store/Reducers/authReducer';

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)

    const [state, setState] = useState({
        email: "",
        new_password: "",
        confirm_password: ""
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
        <div className='min-w-screen min-h-screen bg-slate-50 flex justify-center items-center px-4' >
          <div className='w-full max-w-[380px]'>
            <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl'>
                <h2 className='text-lg font-bold text-slate-800'>Reset your password</h2>
                <p className='text-sm text-slate-400 mt-1 mb-6'>Enter your account email and choose a new password</p>

    <form onSubmit={submit}>

        <div className='flex flex-col w-full gap-1.5 mb-4'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="email">Email</label>
            <input onChange={inputHandle} value={state.email} className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="email" name='email' placeholder='you@example.com' id='email' required />
        </div>

        <div className='flex flex-col w-full gap-1.5 mb-4'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="new_password">New Password</label>
            <input onChange={inputHandle} value={state.new_password} className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="password" name='new_password' placeholder='••••••••' id='new_password' required />
        </div>

        <div className='flex flex-col w-full gap-1.5 mb-5'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="confirm_password">Confirm New Password</label>
            <input onChange={inputHandle} value={state.confirm_password} className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="password" name='confirm_password' placeholder='••••••••' id='confirm_password' required />
        </div>

        <button disabled={loader ? true : false} className='bg-[#2563EB] hover:bg-[#1d4ed8] w-full shadow-md shadow-blue-600/30 transition-colors text-white font-semibold rounded-lg px-7 py-2.5 mb-4'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Reset Password'
            }
            </button>

        <div className='flex items-center gap-3 justify-center text-sm text-slate-500'>
            <p>Remembered it? <Link className='font-semibold text-[#2563EB] hover:underline' to="/login">Sign In</Link> </p>
        </div>

    </form>

            </div>
            </div>

        </div>
    );
};

export default ForgotPassword;
