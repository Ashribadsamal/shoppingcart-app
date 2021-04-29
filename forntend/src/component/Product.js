import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'


function Product({item}) {
    return (
        <div>
            <div className="card" key={item._id}>
                <Link to={`/product/${item._id}`}>
                    <img className="medium" src={item.image} alt={item.name}/>
                </Link>
                <div className="card-body">
                  <Link to={`/product/${item._id}`}>
                      <h2>{item.name}</h2>
                  </Link>
                  <Rating rating={item.rating} numReviews={item.numReviews}/>
                  
                  <div className="price">${item.price}</div>
                </div>
              </div>
        </div>
    )
}

export default Product
