import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination'; 
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { get_products, delete_product } from '../../store/Reducers/productReducer';
import { LuImageMinus } from "react-icons/lu";

const Products = () => {

    const dispatch = useDispatch()
    const { products,totalProduct} = useSelector(state=> state.product)
   
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj))

    },[searchValue, currentPage,parPage])

    const delete_product_handler = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(delete_product(productId))
        }
    }

    return (
        <div className='py-2'>
            <h1 className='text-[#E2E8F0] font-bold text-lg mb-4'>All Products</h1>

         <div className='w-full p-5 bg-[#334155] rounded-xl border border-slate-700 shadow-sm'> 
         <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

         <div className='relative overflow-x-auto'>
    <table className='w-full text-sm text-left text-[#E2E8F0]'>
        <thead className='text-xs text-[#E2E8F0] uppercase tracking-wide border-b border-slate-700'>
        <tr>
            <th scope='col' className='py-3 px-4 rounded-l-lg'>No</th>
            <th scope='col' className='py-3 px-4'>Image</th>
            <th scope='col' className='py-3 px-4'>Name</th>
            <th scope='col' className='py-3 px-4'>Category</th>
            <th scope='col' className='py-3 px-4'>Brand</th>
            <th scope='col' className='py-3 px-4'>Price</th>
            <th scope='col' className='py-3 px-4'>Discount</th>
            <th scope='col' className='py-3 px-4'>Stock</th>
            <th scope='col' className='py-3 px-4 rounded-r-lg'>Action</th> 
        </tr>
        </thead>

        <tbody>
            {
                products.map((d, i) => <tr key={i} className='border-b border-slate-700 last:border-none hover:bg-slate-700/40 transition-colors'>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-400'>{i + 1}</td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[42px] h-[42px] rounded-lg object-cover border border-slate-600' src={ d.images[0]} alt="" />
                </td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-[#E2E8F0]'>{ d?.name?.slice(0,15)}...</td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-300 capitalize'>{ d.category }</td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-300'>{d.brand} </td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-[#E2E8F0]'>₹{d.price}</td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                    {
                        d.discount === 0 ? <span className='text-slate-400 text-xs'>No Discount</span> : 

                        <span className='text-emerald-400 font-semibold text-xs'>{d.discount}%</span>
                    }
                    
                     </td>
                
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-300'>{d.stock}</td>
                 
    <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
        <div className='flex justify-start items-center gap-2'>
        <Link to={`/seller/dashboard/edit-product/${d._id}`} className='p-[7px] bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors'> <FaEdit/> </Link> 

        <Link to={`/seller/dashboard/add-banner/${d._id}`} className='p-[7px] bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors'> <LuImageMinus /> </Link> 

        <Link className='p-[7px] bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors'> <FaEye/> </Link>
        <button onClick={() => delete_product_handler(d._id)} className='p-[7px] bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors'> <FaTrash/> </button> 
        </div>
        
        </td>
            </tr> )
            }

        </tbody> 
    </table> 
    </div>  

            {
                totalProduct <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                <Pagination 
                    pageNumber = {currentPage}
                    setPageNumber = {setCurrentPage}
                    totalItem = {50}
                    parPage = {parPage}
                    showItem = {3}
                />
                </div>
            }

         </div>
        </div>
    );
};

export default Products;