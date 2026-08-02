import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customer_update_name, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';

const ChangeName = () => {

    const dispatch = useDispatch()
    const { userInfo, loader, successMessage, errorMessage } = useSelector(state => state.auth)

    const [name, setName] = useState(userInfo?.name || '')

    const submit = (e) => {
        e.preventDefault()

        if (!name.trim()) {
            toast.error('Name cannot be empty')
            return
        }
        if (name.trim() === userInfo?.name) {
            toast.error('This is already your current name')
            return
        }

        dispatch(customer_update_name({
            customerId: userInfo.id,
            name: name.trim()
        }))
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
    }, [successMessage, errorMessage])

    return (
        <div className='p-5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-[520px]'>
            <h2 className='text-lg font-bold text-slate-700 pb-4 border-b border-slate-100 mb-4'>Change Name </h2>

        <form onSubmit={submit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="name">Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="text" name="name" id="name"  placeholder='Your Name' required/>
            </div>

            <p className='text-xs text-slate-400 -mt-2'>
                Note: past reviews you've submitted will still show your old name, since they're saved as a snapshot at the time you posted them.
            </p>

            <div className='pt-1'>
                <button disabled={loader} className='px-8 py-2.5 bg-[#F26627] hover:bg-[#C24A16] transition-colors text-white rounded-lg text-sm font-semibold disabled:opacity-60'>
                    {loader ? 'Updating...' : 'Update Name'}
                </button>
            </div>

        </form>

        </div>
    );
};

export default ChangeName;