import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { addToCart,removeCart } from '../action/CartAction';
import MessageBox from './MessageBox';

function CartScreen(props) {
    const productId = props.match.params.id
    const qty= props.location.search? Number(props.location.search.split('=')[1]): 1;
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
   const {cartItems} = cart;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }   
    }, [dispatch, productId, qty])


    const removeCartHandeler= (id) =>{
        //delete
        dispatch(removeCart(id));
    }

    const checkoutHandler =()=>{
        props.history.push('/signin?redirect=shipping');
    }


    return (
        <div className="row top">
           <div className="col-2">
               <h1>Shopping Cart</h1>
               {cartItems.length === 0? <MessageBox>
                   cart Is Empty. <Link to="/">GO Shopping</Link>
               </MessageBox>
               :(
                   <ul>
                       {
                           cartItems.map((item)=>(
                               <li key={item.product}>
                                   <div className="row">
                                       <div>
                                           <img src={item.image} alt={item.name} className="small"></img>
                                       </div>
                                       <div className="min-30">
                                           <Link to={`/product/${item.product}`}>{item.name}</Link>
                                       </div>
                                       <div>
                                       <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                       {
                                         [...Array(item.countInStock).keys()].map(i=>(
                                          <option key={i+1} value={i+1}>{i+1}</option>
                                          ))
                                        }
                                       </select>
                                       </div>
                                       <div>
                                           ${item.price}
                                       </div>
                                       <div>
                                           <button type="button" onClick={()=> removeCartHandeler(item.product)}>Delete</button>
                                       </div>
                                   </div>
                               </li>
                           ))
                       }
                   </ul>
               )
               }
           </div>
           <div className="col-1">
               <div className="card card-body">
                   <ul>
                       <li>
                           <h2>
                               Subtotal({cartItems.reduce((a,c)=> a+c.qty, 0)} items) : ${cartItems.reduce((a,c)=> a + c.price * c.qty, 0)}
                           </h2>
                       </li>
                       <li>
                           <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to CheckOut</button>
                       </li>
                   </ul>
               </div>
           </div>
        </div>
    )
}

export default CartScreen
