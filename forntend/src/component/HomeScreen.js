import React,{useState,useEffect} from 'react'
import Product from './Product'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import {useSelector,useDispatch} from 'react-redux'
import { listProducts } from '../action/ProductAction';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList  =  useSelector((state)=> state.productList);
    const {loading,error,products} = productList;
    
    useEffect(() => {
       dispatch(listProducts());
    }, [])

   /* const fetchData = async()=>{
        try{
            setLoding(true);
            const {data} = await axios.get('/api/product')
            setLoding(false)
            console.log(data)
            setProduct(data);
        }catch(err){
            setError(err.message);
            setLoding(false)
        }
       
    }*/
    return (
        <div>
            {loading?(<LoadingBox></LoadingBox>)
            :error?(<MessageBox variant="danger">{error}</MessageBox>)
            :(
            <div className="row center">
                {products.map((item)=>(
                    <Product key={item._id} item={item}></Product>
                ))}
           </div> 
            )}
         
        </div>
    )
}

export default HomeScreen
