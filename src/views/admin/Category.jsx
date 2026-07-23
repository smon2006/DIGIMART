import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaImage } from "react-icons/fa"; 
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { categoryAdd, messageClear,get_category,updateCategory,deleteCategory } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from '../components/Search';
 
const Category = () => {

    const dispatch = useDispatch()
    const {loader,successMessage,errorMessage,categorys} = useSelector(state=> state.category)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] =  useState(false)
    const [imageShow, setImage] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)

    const [state, setState] = useState({

        name: '',
        image: ''

    })

    const imageHandle = (e) => {
        let files = e.target.files 
        if (files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }

    const addOrUpdateCategory = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(updateCategory({ id:editId, ...state }))
        }else{
            dispatch(categoryAdd(state))
        }
        
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: '',
                image: ''
            }) 
            setImage('')
            setIsEdit(false)
            setEditId(null)

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        
    },[successMessage,errorMessage,dispatch])
   
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))

    },[searchValue, currentPage,parPage])

    const handleEdit = (category) => {
        setState({
            name: category.name,
            image: category.image
        })
        setImage(category.image)
        setEditId(category._id)
        setIsEdit(true)
        setShow(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure to delete category?')) {
            dispatch(deleteCategory(id));
        }
    }

    return (
        <div className='py-2'>

        <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-xl border border-slate-100 shadow-sm'>
            <h1 className='text-slate-700 font-bold text-lg'>Category</h1>
            <button onClick={() => setShow(true)} className='bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-600/30 px-4 py-2 cursor-pointer text-white rounded-lg text-sm font-semibold transition-colors'>Add</button>

        </div>

            <div className='flex flex-wrap w-full gap-5'>
                <div className='w-full lg:w-7/12'>
                <div className='w-full p-5 bg-white rounded-xl border border-slate-100 shadow-sm'>

               <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}  />

   <div className='relative overflow-x-auto'>
    <table className='w-full text-sm text-left'>
        <thead className='text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100 bg-slate-50'>
        <tr>
            <th scope='col' className='py-3 px-4 rounded-l-lg'>No</th>
            <th scope='col' className='py-3 px-4'>Image</th>
            <th scope='col' className='py-3 px-4'>Name</th>
            <th scope='col' className='py-3 px-4 rounded-r-lg'>Action</th> 
        </tr>
        </thead>

        <tbody>
            {
                categorys.map((d, i) => <tr key={i} className='border-b border-slate-50 last:border-none hover:bg-slate-50/60 transition-colors'>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-500'>{i+1}</td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[42px] h-[42px] rounded-lg object-cover border border-slate-100' src={d.image} alt="" />
                </td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap text-slate-700 capitalize'>{d.name}</td>
                 
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-2'>
                    <Link className='p-[7px] bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors' onClick={() => handleEdit(d)} > <FaEdit/> </Link> 
                    <Link className='p-[7px] bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors' onClick={() => handleDelete(d._id)}  > <FaTrash/> </Link> 
                    </div>
                    
                    </td>
            </tr> )
            }

        </tbody> 
    </table> 
    </div>  

    <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
        <Pagination 
            pageNumber = {currentPage}
            setPageNumber = {setCurrentPage}
            totalItem = {50}
            parPage = {parPage}
            showItem = {3}
        />
        </div>

                </div>

                </div>

    <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500 `} >
    <div className='w-full lg:pl-0 pl-5'>
        <div className='bg-white h-screen lg:h-auto p-5 lg:rounded-xl lg:border lg:border-slate-100 lg:shadow-sm'>

            <div className='flex justify-between items-center mb-5' >
            <h1 className='text-slate-700 font-bold text-lg w-full'> { isEdit ? 'Edit Category' : 'Add Category' } </h1>

            <div onClick={() => setShow(false) } className='block lg:hidden text-slate-400 text-2xl cursor-pointer'>
            <IoMdCloseCircle /> 
            </div>
            </div>

            <form onSubmit={addOrUpdateCategory}>
                <div className='flex flex-col w-full gap-1.5 mb-4'>
                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="name">Category Name</label>
                    <input value={state.name} onChange={(e)=>setState({...state,name : e.target.value})} className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' type="text" id='name' name='category_name' placeholder='e.g. Electronics' />
                 </div>

                 <div>
                    <label className='flex justify-center items-center flex-col h-[220px] cursor-pointer border-2 border-dashed hover:border-[#2563EB] hover:bg-blue-50/40 w-full border-slate-200 rounded-xl text-slate-400 transition-all overflow-hidden'  htmlFor="image">
                        {
                          imageShow ? <img className='w-full h-full object-cover' src={imageShow} alt="preview" /> : <>
                        <span className='text-3xl mb-2'><FaImage/> </span>
                        <span className='text-sm font-medium'>Select Image</span> 
                          </>
                        }
                        
                    </label>
                    <input onChange={imageHandle} className='hidden' type="file" name="image" id="image" />
            <div className='mt-4'>
            <button disabled={loader ? true : false}  className='bg-[#2563EB] hover:bg-[#1d4ed8] w-full shadow-md shadow-blue-600/30 transition-colors text-white font-semibold rounded-lg px-7 py-2.5 mb-1'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : isEdit ? 'Update Category' : 'Add Category'
            } 
            </button> 

            </div>

                 </div>

            </form>

        </div>
        
     </div>

    </div>

            </div>
            
        </div>
    );
};

export default Category;
