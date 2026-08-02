import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customer_change_password, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';

const ChangePassword = () => {

    const dispatch = useDispatch()
    const { userInfo, loader, successMessage, errorMessage } = useSelector(state => state.auth)

    const [state, setState] = useState({
        old_password: '',
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
            toast.error('New password and confirm password do not match')
            return
        }
        if (state.new_password.length < 6) {
            toast.error('New password should be at least 6 characters')
            return
        }

        dispatch(customer_change_password({
            customerId: userInfo.id,
            old_password: state.old_password,
            new_password: state.new_password
        }))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setState({ old_password: '', new_password: '', confirm_password: '' })
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    return (
        <div className='p-5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-[520px]'>
            <h2 className='text-lg font-bold text-slate-700 pb-4 border-b border-slate-100 mb-4'>Change Password </h2>

        <form onSubmit={submit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="old_password">Old Password</label>
            <input onChange={inputHandle} value={state.old_password} className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="old_password" id="old_password"  placeholder='Old Password' required/>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="new_password">New Password</label>
            <input onChange={inputHandle} value={state.new_password} className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="new_password" id="new_password"  placeholder='New Password' required/>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="confirm_password">Confirm Password</label>
            <input onChange={inputHandle} value={state.confirm_password} className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="confirm_password" id="confirm_password"  placeholder='Confirm Password' required/>
            </div>
            <div className='pt-1'>
                <button disabled={loader} className='px-8 py-2.5 bg-[#F26627] hover:bg-[#C24A16] transition-colors text-white rounded-lg text-sm font-semibold disabled:opacity-60'>
                    {loader ? 'Updating...' : 'Update Password'}
                </button>
            </div>

        </form>

        </div>
    );
};

export default ChangePassword;