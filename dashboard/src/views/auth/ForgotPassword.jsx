import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { overrideStyle } from '../../utils/utils';
import { forgot_password, messageClear } from '../../store/Reducers/authReducer';

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)

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
        <div className='min-w-screen min-h-screen bg-[#E2E8F0] flex justify-center items-center' >
          <div className='w-[350px] text-[#ffffff] p-2'>
            <div className='bg-[#334155] p-4 rounded-md'>
                <h2 className='text-xl mb-3 font-bold'>Reset your password</h2>
                <p className='text-sm mb-3 font-medium'>Enter your account email and choose a new password</p>

    <form onSubmit={submit}>

        <div className='flex flex-col w-full gap-1 mb-3'>
            <label htmlFor="email">Email</label>
            <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' type="email" name='email' placeholder='you@example.com' id='email' required />
        </div>

        <div className='flex flex-col w-full gap-1 mb-3'>
            <label htmlFor="new_password">New Password</label>
            <div className='relative flex items-center'>
                <input onChange={inputHandle} value={state.new_password} className='px-3 py-2 w-full outline-none border border-slate-400 bg-transparent rounded-md pr-10' type={showPassword ? 'text' : 'password'} name='new_password' placeholder='••••••••' id='new_password' required />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 text-slate-300 hover:text-white'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>

        <div className='flex flex-col w-full gap-1 mb-3'>
            <label htmlFor="confirm_password">Confirm New Password</label>
            <div className='relative flex items-center'>
                <input onChange={inputHandle} value={state.confirm_password} className='px-3 py-2 w-full outline-none border border-slate-400 bg-transparent rounded-md pr-10' type={showPassword ? 'text' : 'password'} name='confirm_password' placeholder='••••••••' id='confirm_password' required />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 text-slate-300 hover:text-white'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>

        <button disabled={loader ? true : false} className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Reset Password'
            }
            </button>

        <div className='flex items-center mb-3 gap-3 justify-center'>
            <p>Remembered it? <Link className='font-bold' to="/login">Sign In</Link> </p>
        </div>

    </form>

            </div>
            </div>

        </div>
    );
};

export default ForgotPassword;