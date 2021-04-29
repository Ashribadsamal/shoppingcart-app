import React,{useState,useEffect} from 'react'
import Rating from './Rating'
import {useSelector,useDispatch} from 'react-redux'
import {Link } from 'react-router-dom'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { detailsProduct } from '../action/ProductAction'

function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id
    const [qty,setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
       dispatch(detailsProduct(productId));
    }, [dispatch, productId])
   
    const addTocart=() =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
        {loading?(<LoadingBox></LoadingBox>)
        :error?(<MessageBox variant="danger">{error}</MessageBox>)
        :(
        
            <div>
                <Link to="/">Back to Home</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                            </li>
                            <li>price: ${product.price}</li>
                            <li>
                                Descriptions:
                                <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div >{product.countInStock>0? (<span className="success">InStock</span>):(<span className="error">Unavailable</span>)}</div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                   <>
                                   <li>
                                       <div className="row">
                                           <div>Qty</div>
                                           <div>
                                               <select value={qty} onChange={e => setQty(e.target.value)}>
                                                   {
                                                       [...Array(product.countInStock).keys()].map(i=>(
                                                           <option key={i+1} value={i+1}>{i+1}</option>
                                                       ))
                                                   }
                                               </select>
                                           </div>
                                       </div>
                                   </li>
                                    <li>
                                        <button onClick={addTocart} className="primary block">Add to Cart</button>
                                    </li>
                                   </>
                                   
                                )}
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}
     
    </div>
    )
}

export default ProductScreen
