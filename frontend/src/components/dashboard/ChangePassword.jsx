import React from 'react';

const ChangePassword = () => {
    return (
        <div className='p-5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-[520px]'>
            <h2 className='text-lg font-bold text-slate-700 pb-4 border-b border-slate-100 mb-4'>Change Password </h2>

        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="old_password">Old Password</label>
            <input className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="old_password" id="old_password"  placeholder='Old Password'/>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="new_password">New Password</label>
            <input className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="new_password" id="new_password"  placeholder='New Password'/>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-slate-700' htmlFor="confirm_password">Confirm Password</label>
            <input className='w-full px-4 py-2.5 border border-slate-300 outline-none focus:border-[#F26627] focus:ring-2 focus:ring-[#F26627]/20 rounded-lg text-sm transition-all' type="password" name="confirm_password" id="confirm_password"  placeholder='Confirm Password'/>
            </div>
            <div className='pt-1'>
                <button className='px-8 py-2.5 bg-[#F26627] hover:bg-[#C24A16] transition-colors text-white rounded-lg text-sm font-semibold'>Update Password </button>
            </div>

        </form>

        </div>
    );
};

export default ChangePassword;
