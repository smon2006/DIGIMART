import React, { useState,useEffect,useRef } from 'react';
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
import { price_range_product,query_products,reset_products } from '../store/reducers/homeReducer';

const Shops = () => {

    const dispatch = useDispatch()
    const {products,categorys,priceRange,priceRangeLoaded,latest_product,totalProduct,parPage,loader} = useSelector(state => state.home)

    const [filter, setFilter] = useState(true)

    const [state, setState] = useState({values: [priceRange.low, priceRange.high]})
    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')

    const [pageNumber, setPageNumber] = useState(1)

    const [sortPrice, setSortPrice] = useState('')
    const [category, setCategory] = useState('')
    const queryCategory = (e, value) => {
        setPageNumber(1)
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    const isFirstRun = useRef(true)
    const [ready, setReady] = useState(false)
    const productSectionRef = useRef(null)
    const skipNextRangeEffect = useRef(false)

    const scrollToProducts = () => {
        productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Kick off category list + price range on mount. Nothing else depends on
    // this effect, so it only ever runs once.
    useEffect(() => {
        dispatch(reset_products())
        dispatch(price_range_product())
    },[])

    // Fires exactly once, the moment the price range comes back from the API.
    // This both seeds the slider's local state AND performs the single
    // initial product fetch. Seeding the slider changes state.values, which
    // is also the debounce effect's dependency below - skipNextRangeEffect
    // tells that effect to ignore this particular change instead of firing
    // a second, redundant request a moment later (that second request was
    // the actual cause of the loading flicker/glitch).
    useEffect(() => {
        if (!priceRangeLoaded || !isFirstRun.current) return
        isFirstRun.current = false
        skipNextRangeEffect.current = true
        setState({ values: [priceRange.low, priceRange.high] })
        dispatch(
            query_products({
                low: priceRange.low,
                high: priceRange.high,
                category,
                rating,
                sortPrice,
                pageNumber
            })
        ).then(() => setReady(true))
    },[priceRangeLoaded, priceRange])

    // Price slider only: debounced, so dragging doesn't spam the API.
    // Skipped once right after the effect above seeds state.values, so that
    // initial sync doesn't also trigger a duplicate fetch.
    useEffect(() => {
        if (isFirstRun.current) return
        if (skipNextRangeEffect.current) {
            skipNextRangeEffect.current = false
            return
        }
        const timeoutId = setTimeout(() => {
            dispatch(
                query_products({
                    low: state.values[0],
                    high: state.values[1],
                    category,
                    rating,
                    sortPrice,
                    pageNumber
                })
            ).then(() => setReady(true))
        }, 400)
        return () => clearTimeout(timeoutId)
    },[state.values[0], state.values[1]])

    // Sort / category / rating / page: these are discrete clicks, not a drag
    // gesture, so they should feel instant rather than waiting out a debounce.
    useEffect(() => {
        if (isFirstRun.current) return
        scrollToProducts()
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating,
                sortPrice,
                pageNumber
            })
        ).then(() => setReady(true))
    },[category, rating, sortPrice, pageNumber])

    const resetRating = () => {
        setPageNumber(1)
        setRating('')
    }

    const changeRating = (value) => {
        setPageNumber(1)
        setRating(value)
    }

    const changeSortPrice = (value) => {
        setPageNumber(1)
        setSortPrice(value)
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

            <div className='w-full flex flex-wrap items-start gap-y-8'>
                <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 md:pr-0 sticky md:static top-24 self-start ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0' } `}>
                  <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5'>
                    <h2 className='text-lg font-bold mb-3 text-slate-700 pb-3 border-b border-slate-100'>Category</h2>
        <div className='py-1 flex flex-col gap-1 max-h-[280px] overflow-y-auto pr-1'>
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
                 <div onClick={() => changeRating(5)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                  </div>

                  <div onClick={() => changeRating(4)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => changeRating(3)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => changeRating(2)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => changeRating(1)} className='text-[#F26627] flex justify-start items-start gap-1 text-lg cursor-pointer hover:opacity-70 transition-opacity'>
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

        <div ref={productSectionRef} className='w-9/12 md-lg:w-8/12 md:w-full scroll-mt-24'>
            <div className='pl-8 md:pl-0'>
                <div className='py-4 bg-white mb-8 px-5 rounded-2xl flex justify-between items-center border border-slate-200 shadow-sm flex-wrap gap-3'>
                    <h2 className='text-sm font-semibold text-slate-600'> <span className='text-[#F26627] font-bold'>{ready ? totalProduct : 0}</span> Products Found </h2>
        <div className='flex justify-center items-center gap-3'>
            <select onChange={(e)=>changeSortPrice(e.target.value)} className='p-2 rounded-lg border border-slate-300 outline-0 text-slate-600 text-sm font-medium focus:border-[#F26627] transition-colors' name="" id="">
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

         <div className='pb-8 min-h-[300px]'>
                  {
                    (!ready || loader) ? (
                        <div className='w-full py-20 flex justify-center items-center'>
                            <div className='w-12 h-12 border-4 border-[#F26627] border-t-transparent rounded-full animate-spin'></div>
                        </div>
                    ) : (
                        <div key={ready ? 'loaded' : 'loading'} className={ready ? 'animate-fadeIn' : ''}>
                        <ShopProducts products={ready ? products : []} styles={styles} />  
                        </div>
                    )
                  }
         </div>

         <div>
           {
             ready && totalProduct > parPage &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={5} />
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