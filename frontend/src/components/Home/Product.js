import React from 'react'
import ReactStars from 'react-rating-stars-component';
import {Link} from 'react-router-dom'

const options = {
    edit : false,
    isHalf : true,
    activeColor : 'gold',
    size : window.innerWidth < 600 ? 18 : 25,
}

const Product = ({product}) => {
  return (
      <Link className='productCard' to={product._id}>
        <img src = {product.images[0].url} alt = 't-shirt'/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} value = {product.rating}/> <span  className='review' >({product.numberOfReviews} reviews)</span>
        </div>
        <p>Rs{product.price}</p>
      </Link>
    );
}

export default Product