import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/Rating';
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BsChatDotsFill } from "react-icons/bs";
import Reviews from '../components/Reviews';
import {Pagination } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/pagination';
import {Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import { add_to_card,messageClear,add_to_wishlist } from '../store/reducers/cardReducer';
 
const Details = () => {

    const navigate = useNavigate()
    const {slug} = useParams()
    const dispatch = useDispatch()
    const {product,relatedProducts,moreProducts} = useSelector(state => state.home)
    const {userInfo } = useSelector(state => state.auth)
    const {errorMessage,successMessage } = useSelector(state => state.card)

    useEffect(() => {
        dispatch(product_details(slug))
    },[slug])

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        
    },[successMessage,errorMessage])

    const images = [1,2,3,4,5,6]
    const [image, setImage] = useState('')
    const discount = 10
    const stock = 3
    const [state, setState] = useState('reviews')

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        },
    }

    const [quantity, setQuantity] = useState(1)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of Stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_card = () => {
        if (userInfo) {
           dispatch(add_to_card({
            userId: userInfo.id,
            quantity,
            productId : product._id
           }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }
       
    }

   const buynow = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }

        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price :  quantity * (price - Math.floor((price * 5) / 100)),
                products : [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        
        navigate('/shipping',{
            state: {
                products : obj,
                price: price * quantity,
                shipping_fee : 50,
                items: 1
            }
        }) 
   }

    return (
        <div>
            <Header/>
    <PageHeader
        title={product.name || 'Product Details'}
        crumbs={[
            { to: '/shops', label: 'Shop' },
            { to: `/products?category=${product.category}`, label: product.category },
            { label: product.name }
        ]}
    />

        <section className='pt-10'>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-4'>
            <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-10'>
                <div>
                <div className='p-5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center'>
                    <img className='h-[400px] w-full object-contain' src={image ? image : product.images?.[0] } alt="" />
                </div>
            <div className='py-3'>
                {
                    product.images && <Carousel
                    autoPlay={true}
                    infinite={true} 
                    responsive={responsive}
                    transitionDuration={500}
                    itemClass='px-1.5'
                >
                    { 
                       product.images.map((img, i) => {
                        return (
                            <div key={i}  onClick={() => setImage(img)} className='rounded-lg overflow-hidden border border-slate-200 hover:border-[#2563EB] transition-colors cursor-pointer'>
                   <img className='h-[100px] w-full object-cover cursor-pointer' src={img} alt="" /> 
                            </div>
                        )
                       })
                    } 

                </Carousel>
                }
           </div>    
           </div>

        <div className='flex flex-col gap-5'>
                <div className='text-2xl text-slate-800 font-bold'>
                    <h3>{product.name} </h3>
                </div>
                <div className='flex justify-start items-center gap-3'>
                    <div className='flex text-lg'>
                        <Rating ratings={4.5} />
                    </div>
                    <span className='text-slate-500 text-sm'>(24 reviews)</span> 
                </div>

         <div className='text-2xl font-bold flex items-center gap-3'>
            {
                product.discount !== 0 ? <>
                <span className='text-slate-400 text-lg line-through font-medium'>₹{product.price}</span>
                <span className='text-red-500'>₹{product.price - Math.floor((product.price * product.discount) / 100)}</span>
                <span className='text-red-500 text-sm font-semibold bg-red-50 px-2 py-1 rounded-md'>-{product.discount}%</span>
                
                </> : <h2 className='text-slate-800'> ₹{product.price} </h2>
            }
          </div> 

          <div className='text-slate-600 text-sm leading-relaxed'>
            <p>{product.description}  </p>
            <p className='text-slate-700 py-1 font-semibold'>Shop Name : <span className='text-[#2563EB]'>{product.shopName}</span></p>
           </div> 

            <div className='flex gap-3 pb-8 border-b border-slate-100 flex-wrap'>
                {
                    product.stock ? <>
        <div className='flex bg-slate-100 rounded-lg h-[48px] justify-center items-center text-base overflow-hidden'>
            <div title="Decrease quantity" onClick={dec} className='px-5 h-full flex items-center cursor-pointer hover:bg-slate-200 transition-colors text-slate-600'><FaMinus size={12}/></div>
            <div className='px-5 font-semibold text-slate-700'>{quantity}</div>
            <div title="Increase quantity" onClick={inc} className='px-5 h-full flex items-center cursor-pointer hover:bg-slate-200 transition-colors text-slate-600'><FaPlus size={12}/></div>
        </div>
                    <div>
                        <button onClick={add_card} className='px-8 h-[48px] cursor-pointer transition-all rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white'>Add To Cart</button>
                    </div>
                    
                    </> : <span className='px-4 h-[48px] flex items-center rounded-lg bg-red-50 text-red-500 font-semibold text-sm'>Out of Stock</span>
                }

                <div>
                    <div title="Add to Wishlist" onClick={add_wishlist} className='h-[48px] w-[48px] rounded-lg flex justify-center items-center cursor-pointer transition-all bg-slate-100 hover:bg-[#2563EB] text-slate-500 hover:text-white'>
                    <FaHeart />
                    </div> 
                </div> 
            </div>  

        <div className='flex py-2 gap-5 flex-wrap'>
            <div className='w-[150px] text-slate-700 font-semibold text-sm flex flex-col gap-5'>
                 
                <span>Availability</span>
                <span>Share On</span> 
            </div> 
            <div className='flex flex-col gap-5'>
                <span className={`text-sm font-semibold ${product.stock ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock ? `In Stock (${product.stock})` : 'Out Of Stock'}
                </span> 

    <ul className='flex justify-start items-center gap-3'>
        <li>
            <a title="Share on Facebook" className='w-[36px] h-[36px] hover:bg-[#2563EB] hover:text-white transition-colors flex justify-center items-center bg-slate-100 rounded-full text-slate-500' href="#"> <FaFacebookF size={13} /> </a>
        </li>
        <li>
            <a title="Share on Twitter" className='w-[36px] h-[36px] hover:bg-[#2563EB] hover:text-white transition-colors flex justify-center items-center bg-slate-100 rounded-full text-slate-500' href="#"> <FaTwitter size={13} /> </a>
        </li>
        <li>
            <a title="Share on LinkedIn" className='w-[36px] h-[36px] hover:bg-[#2563EB] hover:text-white transition-colors flex justify-center items-center bg-slate-100 rounded-full text-slate-500' href="#"> <FaLinkedin size={13} /> </a>
        </li>
        <li>
            <a title="Share on GitHub" className='w-[36px] h-[36px] hover:bg-[#2563EB] hover:text-white transition-colors flex justify-center items-center bg-slate-100 rounded-full text-slate-500' href="#"> <FaGithub size={13} /> </a>
        </li>
    </ul> 

            </div>
          </div>

          <div className='flex gap-3 flex-wrap pt-2'>
                {
                    product.stock ? <button onClick={buynow} className='px-8 h-[48px] cursor-pointer transition-colors rounded-lg font-semibold bg-[#1e293b] hover:bg-[#0f172a] text-white'>Buy Now</button> : ''
                }
                <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 h-[48px] flex items-center gap-2 cursor-pointer transition-colors rounded-lg font-semibold border-2 border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]'>
                    <BsChatDotsFill /> Chat Seller
                </Link>
            </div>

             </div>   
            </div> 
       </div> 
       </div>
        </section>

        <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
           <div className='flex flex-wrap gap-8'>
            <div className='w-[70%] md-lg:w-full'>
                <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-4'>
                    <div className='inline-flex gap-2 p-1 bg-slate-100 rounded-full'>
                    <button onClick={() => setState('reviews')} className={`py-2 px-6 transition-colors text-sm font-semibold ${state === 'reviews' ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:text-[#2563EB]'} rounded-full`}>Reviews </button>
                    
                    <button onClick={() => setState('description')} className={`py-2 px-6 transition-colors text-sm font-semibold ${state === 'description' ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:text-[#2563EB]' } rounded-full`}>Description </button>
                    </div>

    <div>
        {
            state === 'reviews' ? <Reviews product={product} /> : <p className='py-5 text-slate-600 text-sm leading-relaxed'>
    {product.description}
            </p>
        }
    </div> 
         </div> 
         </div>

<div className='w-[28%] md-lg:w-full flex-1'>
    <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
    <div className='px-4 py-3 bg-[#1e293b]'>
        <h2 className='font-bold text-white text-sm'>From {product.shopName}</h2>
    </div>
    <div className='flex flex-col gap-3 p-3'>
        {
            moreProducts.map((p,i) => {
                return (
        <Link key={i} className='group block rounded-xl overflow-hidden hover:bg-slate-50 transition-colors p-2'>
            <div className='relative h-[220px] rounded-lg overflow-hidden bg-slate-50'>
            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={ p.images[0]} alt="" /> 
            {
            p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[34px] h-[34px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 shadow-md'>{p.discount}%
            </div>
            }
            </div>

            <h2 className='text-slate-700 py-1 font-semibold text-sm truncate'>{p.name} </h2>
            <div className='flex gap-2 items-center'>
                <h2 className='text-base font-bold text-slate-800'>₹{p.price}</h2>
                <div className='flex items-center gap-2'>
                    <Rating ratings={p.rating}  />
                </div>
            </div>
            
        </Link>
                )
            })
        }

    </div>
</div>
</div> 

    </div>  
        </div>
        </section>

<section>
<div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
<div className='text-center flex justify-center items-center flex-col text-3xl text-slate-700 font-bold relative pb-[40px]'>
    <h2>Related Products</h2>
    <div className='w-[70px] h-[3px] rounded-full bg-[#2563EB] mt-4'></div>
</div>
<div>
    <Swiper
    slidesPerView='auto'
    breakpoints={{
        1280 : {
            slidesPerView: 3
        },
        565 : {
            slidesPerView: 2
        }
    }}
    spaceBetween={25}
    loop={true}
    pagination={{
        clickable: true,
        el: '.custom_bullet'
    }}
    modules={[Pagination]}
    className='mySwiper' 
    > 

    {
        relatedProducts.map((p, i) => {
            return (

                <SwiperSlide key={i}>
                    <Link className='group block rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                        <div className='relative h-[240px] overflow-hidden bg-slate-50'>
                            <div className='w-full h-full'>
                    <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={p.images[0] } alt="" />
                           </div>
            {
            p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[36px] h-[36px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 shadow-md'>{p.discount}%
            </div>
            } 
                </div>

            <div className='p-4 flex flex-col gap-1'>
            <h2 className='text-slate-700 text-base font-semibold truncate'>{p.name} </h2>
            <div className='flex justify-start items-center gap-3'>
                <h2 className='text-base font-bold text-slate-800'>₹{p.price}</h2>
                <div className='flex'>
                    <Rating ratings={p.rating}  />
                </div>
            </div>
            </div>

                    </Link>

                </SwiperSlide>

            )
        })
    }
    
    </Swiper>
</div>

      <div className='w-full flex justify-center items-center py-8'>
        <div className='custom_bullet justify-center gap-3 !w-auto'> 
        </div>

      </div>

</div>
</section>

            <Footer/> 
        </div>
    );
};

export default Details;