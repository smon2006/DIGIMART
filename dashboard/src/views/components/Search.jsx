import React from 'react';
 
const Search = ({setParPage,setSearchValue,searchValue}) => {
    return (
        <div className='flex justify-between items-center gap-3 mb-4'>
        <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-3 py-2 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 transition-all'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option> 
        </select>
        <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className='px-3 py-2 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 placeholder:text-slate-400 transition-all w-full max-w-[240px]' type="text" placeholder='Search...' /> 
    </div>
    );
}; 

export default Search;