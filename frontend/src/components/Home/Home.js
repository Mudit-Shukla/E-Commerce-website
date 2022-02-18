import React from 'react';
import '../Home/Home.css'
import Product from './Product.js';
import MetaData from '../layout/MetaData';

const product = {
  name :'US POLO',
  images : [{url : "https://picsum.photos/350/450"}],
  price : 'Rs 1500',
  _id: 'sampleId' 
}

const Home = () => {
  return (
      <>
<MetaData title ='Buy&Joy'/>
        <div className='banner'>
            <p> Welcome to Buy & Joy</p>
            <h1>Find Amazing Products Below</h1>
            <a href = '#container'>
              <span></span>
            </a>
        </div>

        <h2 className='heading'>Featured Products</h2> 

        <div className='container' id = 'container'>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>

        </div>
      </>
  );
};

export default Home;
