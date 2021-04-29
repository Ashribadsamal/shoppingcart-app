import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import HomeScreen from './component/HomeScreen'
import ProductScreen from './component/ProductScreen'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import CartScreen from './component/CartScreen'
import SigninScreen from './component/SigninScreen'
import { signout } from './action/UserAction'
import RegisterScreen from './component/RegisterScreen'
import ShippingAddress from './component/ShippingAddress'
import PaymentScreen from './component/PaymentScreen'
import PlaceOrderScreen from './component/PlaceOrderScreen'
import OrderScreen from './component/OrderScreen'
import OrderHistoryScreen from './component/OrderHistoryScreen'
import ProfileScreen from './component/ProfileScreen'
import PrivateRoute from './component/PrivateRoute'

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  const userSignin = useSelector((state)=> state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();

 const signoutHandler = ()=>{
  dispatch(signout())
 }

  return (
<Router>
  <div className="grid-container">
    <header className="row">
        <div>
            <Link className="brand" to="/">shopping</Link>
        </div>
        <div>
            <Link to="/cart">cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}</Link>

            {
              userInfo ? (
                <div className="dropdown">
                <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/profile">User Profile </Link>
                  </li>
                  <li>
                  <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </li>
                  
                </ul>
                </div>
              ) :
              (
                <Link to="/signin">Sign In</Link>
              )
            }
            
        </div>
    </header>
    <main>
      <Route exact path='/' component={HomeScreen}/>
      <Route exact path='/product/:id' component={ProductScreen}/>
      <Route path ="/cart/:id?" component={CartScreen}/>  
      <Route path="/signin" component={SigninScreen}/>
      <Route path="/register" component={RegisterScreen}/>
      <Route path='/shipping' component={ShippingAddress}/>
      <Route path="/payment" component={PaymentScreen}/>
      <Route path="/order/:id" component={OrderScreen}/>
      <Route path="/placeorder" component={PlaceOrderScreen}/>
      <Route path="/orderhistory" component={OrderHistoryScreen}/>
      <PrivateRoute path="/profile" component={ProfileScreen}/>
    </main>       
  </div>
</Router>
  );
}

export default App;
