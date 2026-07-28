import React, { useState,useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Range } from 'react-range';
import {AiFillStar} from 'react-icons/ai'
import {CiStar} from 'react-icons/ci' 
import Products from '../components/products/Products';
import {BsFillGridFill} from 'react-icons/bs'
import {FaThList} from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product,query_products } from '../store/reducers/homeReducer';

const Shops = () => {

    const dispatch = useDispatch()
    const {products,categorys,priceRange,latest_product,totalProduct,parPage} = useSelector(state => state.home)

    useEffect(() => { 
        dispatch(price_range_product())
    },[])
    useEffect(() => { 
        setState({
            values: [priceRange.low, priceRange.high]
        })
    },[priceRange])

    const [filter, setFilter] = useState(true) 

    const [state, setState] = useState({values: [priceRange.low, priceRange.high]})
    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')

    const [pageNumber, setPageNumber] = useState(1)

    const [sortPrice, setSortPrice] = useState('')
    const [category, setCategory] = useState('')
    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    useEffect(() => { 
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating,
                sortPrice,
                pageNumber
            })
         )
    },[state.values[0],state.values[1],category,rating,sortPrice,pageNumber])

    const resetRating = () => {
        setRating('')
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating: '',
                sortPrice,
                pageNumber
            })
         )
    }
    
    return (
        <div className='min-h-screen bg-[#325D79]'>
           <Header/>
           <PageHeader title='Shop' crumbs={[{ label: 'Shop' }]} />

           <section className='py-16'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className={` md:block hidden ${!filter ? 'mb-6' : 'mb-0'} `}>
                <button onClick={() => setFilter(!filter)} className='text-center w-full py-3 px-3 bg-[#F26627] hover:bg-[#C24A16] transition-colors text-white rounded-lg font-semibold text-sm'>Filter Product</button> 
            </div>

            <div className='w-full flex flex-wrap gap-y-8'>
                <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 md:pr-0 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0' } `}>
                  <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5'>
                    <h2 className='text-lg font-bold mb-3 text-slate-700 pb-3 border-b border-slate-100'>Category</h2>
        <div className='py-1 flex flex-col gap-1'>
            {
                categorys.map((c,i) => <div key={i} className='flex justify-start items-center gap-2 py-1.5 hover:text-[#F26627] transition-colors'>
                    <input className='accent-[#F26627] w-4 h-4 cursor-pointer' checked={category === c.name ? true : false} onChange={(e)=>queryCategory(e,c.name)} type="checkbox" id={c.name} />
                    <label className='text-slate-600 text-sm block cursor-pointer w-full' htmlFor={c.name}>{c.name}</label>
                </div>)
            }
        </div>

        <div className='py-4 flex flex-col gap-5 border-t border-slate-100 mt-2'>
            <h2 className='text-lg font-bold text-slate-700'>Price</h2>
             
             <Range
                step={5}
                min={priceRange.low}
                max={priceRange.high}
                values={(state.values)}
                onChange={(values) => setState({values})}
                renderTrack={({props,children}) => (
                    <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div className='w-[16px] h-[16px] bg-[#F26627] rounded-full shadow-md ring-2 ring-white' {...props} />
    
                )} 
             />  
         <div>
         <span className='text-slate-800 font-bold text-sm'>₹{Math.floor(state.values[0])} - ₹{Math.floor(state.values[1])}</span>  
           </div>
         </div>

         <div className='py-4 flex flex-col gap-3 border-t border-slate-100 mt-2'>
            <h2 className='text-lg font-bold text-slate-700 mb-1'>Rating</h2>
            <div className='flex flex-col gap-2.5'>
                 <div onClick={() => setRating(5)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                  </div>

                  <div onClick={() => setRating(4)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(3)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(2)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(1)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={resetRating} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  </div> 
            </div> 
         </div>
        
        <div className='py-2 flex flex-col gap-4 md:hidden border-t border-slate-100 mt-2 pt-4'>
            <Products title='Latest Product'  products={latest_product} />
        </div> 
          </div>
          </div>

        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
            <div className='pl-8 md:pl-0'>
                <div className='py-4 bg-white mb-8 px-5 rounded-2xl flex justify-between items-center border border-slate-200 shadow-sm flex-wrap gap-3'>
                    <h2 className='text-sm font-semibold text-slate-600'> <span className='text-[#F26627] font-bold'>{totalProduct}</span> Products Found </h2>
        <div className='flex justify-center items-center gap-3'>
            <select onChange={(e)=>setSortPrice(e.target.value)} className='p-2 rounded-lg border border-slate-300 outline-0 text-slate-600 text-sm font-medium focus:border-[#F26627] transition-colors' name="" id="">
                <option value="">Sort By</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
            </select>
        <div className='flex justify-center items-center gap-2 md-lg:hidden'>
            <div onClick={()=> setStyles('grid')} className={`p-2.5 rounded-lg ${styles === 'grid' ? 'bg-[#F26627] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'} cursor-pointer transition-colors `} >
                  <BsFillGridFill/>  
            </div>
            <div onClick={()=> setStyles('list')} className={`p-2.5 rounded-lg ${styles === 'list' ? 'bg-[#F26627] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'} cursor-pointer transition-colors `} >
                  <FaThList/>  
            </div> 
        </div> 
        </div> 
         </div> 

         <div className='pb-8'>
                  <ShopProducts products={products} styles={styles} />  
         </div>

         <div>
           {
             totalProduct > parPage &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={Math.floor(totalProduct / parPage )} />
           }
         </div>

            </div> 
         </div>  

            </div>
            </div> 
           </section>

           <Footer/>
        </div>
    );
};

export default Shops;