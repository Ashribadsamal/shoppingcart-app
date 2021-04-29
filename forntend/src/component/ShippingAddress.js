import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingAddress } from '../action/CartAction'
import CheckoutSteps from './CheckoutSteps'

function ShippingAddress(props) {

    const  userSignin = useSelector(state => state.userSignin)
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart;
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push('/signin')
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();


    const submitHandler= (e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value) }required/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter your address" value={address} onChange={(e)=> setAddress(e.target.value) }required/>
                </div>
               
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter Your city" value={city} onChange={(e)=> setCity(e.target.value) }required/>
                </div>
                <div>
                    <label htmlFor="postalcode">PostalCode</label>
                    <input type="number" id="postalcode" placeholder="Enter PostalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value) }required/>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter country" value={country} onChange={(e)=> setCountry(e.target.value) }required/>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddress
