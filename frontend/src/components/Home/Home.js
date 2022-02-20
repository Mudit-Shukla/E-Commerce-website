import React, { useEffect } from 'react';
import '../Home/Home.css'
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux'



const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const { loading, error, products, productsCount } = useSelector(state => (state.products))
  return (

    <>
      {loading ? "Loading" : <>
        <MetaData title='Buy&Joy' />
        <div className='banner'>
          <p> Welcome to Buy & Joy</p>
          <h1>Find Amazing Products Below</h1>
          <a href='#container'>
            <span></span>
          </a>
        </div>

        <h2 className='heading'>Featured Products</h2>

        <div className='container' id='container'>
          {products && products.map((product) =>
            <Product product={product} />
          )}
        </div>
      </>}
    </>

  );
};

export default Home;
