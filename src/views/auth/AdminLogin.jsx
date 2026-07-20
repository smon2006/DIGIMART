import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { admin_login,messageClear } from '../../store/Reducers/authReducer';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

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
        dispatch(admin_login(state))
    }

    const overrideStyle = {
        display : 'flex',
        margin : '0 auto',
        height: '24px',
        justifyContent : 'center',
        alignItems : 'center'
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
            navigate('/')          
        }
    },[errorMessage,successMessage])

    return (
        <div className='min-w-screen min-h-screen bg-slate-50 flex justify-center items-center px-4' >
          <div className='w-full max-w-[380px]'>
            <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-xl'>

        <div className='h-[60px] flex justify-center items-center mb-2'>
            <div className='w-[160px] h-[46px]'>
                <img className='w-full h-full object-contain' src="http://localhost:3000/images/logo.png" alt="logo" />
            </div>
            </div>

        <div className='text-center mb-6'>
            <h2 className='text-lg font-bold text-slate-800'>Admin Sign In</h2>
            <p className='text-sm text-slate-400 mt-1'>Manage your marketplace</p>
        </div>

    <form onSubmit={submit}>

        <div className='flex flex-col w-full gap-1.5 mb-4'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="email">Email</label>
            <input onChange={inputHandle} value={state.email}  className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="email" name='email' placeholder='you@example.com' id='email' required />

        </div>

        <div className='flex flex-col w-full gap-1.5 mb-5'>
            <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="password">Password</label>
            <input onChange={inputHandle} value={state.password}  className='px-3 py-2.5 outline-none border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all' type="password" name='password' placeholder='••••••••' id='password' required />
        </div>


        <button disabled={loader ? true : false}  className='bg-[#2563EB] hover:bg-[#1d4ed8] w-full shadow-md shadow-blue-600/30 transition-colors text-white font-semibold rounded-lg px-7 py-2.5 mb-1'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
            } 
            </button>

    </form>

            </div>
            </div>  
            
        </div>
    );
};

export default AdminLogin;
