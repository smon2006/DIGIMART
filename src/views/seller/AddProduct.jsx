import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer';
import { add_product,messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';
 
const AddProduct = () => {
    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.category)
    const { loader,successMessage,errorMessage } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ""
        }))
    }, [])
     

    const [state, setState] = useState({
        name: "",
        description: '',
        discount: '',
        price: "",
        brand: "",
        stock: ""
    
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })

    }

    const [cateShow, setCateShow] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('') 
  
    const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategory(srcValue)
        } else {
            setAllCategory(categorys)
        }

    }

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])

    const imageHandle = (e) => {
        const files = e.target.files 
        const length = files.length;
        if (length > 0) {
            setImages([...images, ...files])
            let imageUrl = []
            for (let i = 0; i < length; i++) {
                imageUrl.push({url: URL.createObjectURL(files[i])}) 
            }
            setImageShow([...imageShow, ...imageUrl])
        }
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: "",
                description: '',
                discount: '',
                price: "",
                brand: "",
                stock: ""
            }) 
            setImageShow([])
            setImages([])
            setCategory('')

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        

    },[successMessage,errorMessage])

    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow
            let tempImages = images

            tempImages[index] = img
            tempUrl[index] = {url : URL.createObjectURL(img)}
            setImageShow([...tempUrl])
            setImages([...tempImages])

        }
    }

    const removeImage = (i) => {
        const filterImage = images.filter((img,index) => index !== i)
        const filterImageUrl = imageShow.filter((img, index) => index !== i )

        setImages(filterImage)
        setImageShow(filterImageUrl)
    }

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',state.name)
        formData.append('description',state.description)
        formData.append('price',state.price)
        formData.append('stock',state.stock)
        formData.append('discount',state.discount)
        formData.append('brand',state.brand)
        formData.append('shopName','DigiMart') 
        formData.append('category',category)

        for (let i = 0; i < images.length; i++) {
            formData.append('images',images[i]) 
        }
        dispatch(add_product(formData))


    }

    useEffect(() => {
        setAllCategory(categorys)
    },[categorys])

 
    return (
        <div className='py-2'>
            <div className='w-full p-5 bg-white rounded-xl border border-slate-100 shadow-sm'>
                <div className='flex justify-between items-center pb-5 border-b border-slate-100 mb-5'>
                    <h1 className='text-slate-800 text-lg font-bold'>Add Product</h1>
                    <Link to='/seller/dashboard/products' className='bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-600/30 text-white rounded-lg px-5 py-2 text-sm font-semibold transition-colors'>All Products</Link> 
                </div>
<div>
    <form onSubmit={add}>
        <div className='flex flex-col mb-4 md:flex-row gap-4 w-full'>
            <div className='flex flex-col w-full gap-1.5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="name">Product Name</label>
                <input className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.name} type="text" name='name' id='name' placeholder='e.g. Wireless Headphones' />
            </div>  

            <div className='flex flex-col w-full gap-1.5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="brand">Product Brand</label>
                <input className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.brand} type="text" name='brand' id='brand' placeholder='Brand name' />
            </div>   

        </div>


        <div className='flex flex-col mb-4 md:flex-row gap-4 w-full'>
            <div className='flex flex-col w-full gap-1.5 relative'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="category">Category</label>
                <input readOnly onClick={()=> setCateShow(!cateShow)} className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-pointer transition-all' onChange={inputHandle} value={category} type="text" id='category' placeholder='-- select category --' />

                <div className={`absolute top-[101%] bg-white border border-slate-200 rounded-lg shadow-xl w-full transition-all origin-top z-20 ${cateShow ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none' } `}>
                    <div className='w-full px-3 py-2'>
                        <input value={searchValue} onChange={categorySearch} className='px-3 py-2 w-full focus:border-[#2563EB] outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700' type="text" placeholder='Search category' /> 
                    </div>
                    <div className='flex justify-start items-start flex-col max-h-[200px] overflow-y-auto pb-1'>
                        {
                            allCategory.map((c,i) => <span key={i} className={`px-4 py-2 hover:bg-blue-50 hover:text-[#2563EB] w-full cursor-pointer text-sm text-slate-600 transition-colors ${category === c.name && 'bg-blue-50 text-[#2563EB] font-medium'}`} onClick={()=> {
                                setCateShow(false)
                                setCategory(c.name)
                                setSearchValue('')
                                setAllCategory(categorys)
                            }}>{c.name} </span> )
                        } 
                    </div>

                </div>
            </div>  

            <div className='flex flex-col w-full gap-1.5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="stock">Product Stock</label>
                <input className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.stock} type="text" name='stock' id='stock' placeholder='Available units' />
            </div>   

        </div>


        <div className='flex flex-col mb-4 md:flex-row gap-4 w-full'>
            <div className='flex flex-col w-full gap-1.5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="price">Price</label>
                <input className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.price} type="number" name='price' id='price' placeholder='₹0.00' />
            </div>  

            <div className='flex flex-col w-full gap-1.5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="discount">Discount</label>
                <input className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.discount} type="number" name='discount' id='discount' placeholder='Discount %' />
            </div>   

        </div>

        <div className='flex flex-col w-full gap-1.5 mb-5'>
                <label className='text-xs font-semibold text-slate-500 uppercase tracking-wide' htmlFor="description">Description</label>
                <textarea className='px-3 py-2.5 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 transition-all' onChange={inputHandle} value={state.description} name='description' id='description' placeholder='Describe the product' cols="10" rows="4"></textarea> 
                
            </div> 

            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full mb-5'>
               {
                imageShow.map((img,i) => <div key={i} className='h-[160px] relative rounded-lg overflow-hidden border border-slate-200'>
                    <label htmlFor={i}>
                        <img className='w-full h-full object-cover' src={img.url} alt="" />
                    </label>
                    <input onChange={(e)=> changeImage(e.target.files[0],i) } type="file" id={i} className='hidden'/>
                    <span onClick={()=>removeImage(i)} className='p-1.5 z-10 cursor-pointer bg-white/90 hover:bg-white shadow-md text-red-500 absolute top-1.5 right-1.5 rounded-full transition-colors'><IoMdCloseCircle /></span>
                </div> )
               }
               
                <label className='flex justify-center items-center flex-col h-[160px] cursor-pointer border-2 border-dashed hover:border-[#2563EB] hover:bg-blue-50/40 w-full text-slate-400 rounded-lg transition-all' htmlFor="image">
                    <span className='text-2xl mb-1'><IoMdImages /></span>
                    <span className='text-sm font-medium'>Select Images</span>
                </label>
                <input className='hidden' onChange={imageHandle} multiple type="file" id='image' />

            </div>

            <div className='flex'>
            <button disabled={loader ? true : false}  className='bg-[#2563EB] hover:bg-[#1d4ed8] w-full sm:w-[280px] shadow-md shadow-blue-600/30 transition-colors text-white font-semibold rounded-lg px-7 py-2.5'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Product'
            } 
            </button>

            </div>



    </form>
</div>

            </div>
            
        </div>
    );
};

export default AddProduct;
