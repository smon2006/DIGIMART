import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

const Home = () => {

    const dispatch = useDispatch()
    const {products,latest_product,topRated_product,discount_product} = useSelector(state => state.home)
    useEffect(() => { 
        dispatch(get_products()).then(() => {
            const el = document.getElementById('initial-loader');
            if (el) {
                el.classList.add('fade-out');
                setTimeout(() => el.remove(), 400);
            }
        })
    },[])

    return (
        <div className='w-full'>
            <Header />
            <Banner/>
            <Categorys />
            <div className='py-[45px] bg-white'>
            <FeatureProducts products={products} />
            </div>
           
            <div className='py-16 bg-[#9C9C9C]'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
            <div className='overflow-hidden'>
                <Products title='Latest Product' products={latest_product} />
            </div>
            
            <div className='overflow-hidden'>
                <Products title='Top Rated Product' products={topRated_product}/>
            </div>

            <div className='overflow-hidden'>
                <Products title='Discount Product' products={discount_product}/>
            </div>

                    </div> 
                </div> 
            </div>
            <Footer/>

        </div>
    );
};

export default Home;