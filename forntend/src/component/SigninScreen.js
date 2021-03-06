import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from '../action/UserAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function SigninScreen(props) {

    const[email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';
    
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;


    const dispatch = useDispatch();

    const submitHandler=(e) =>{
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
       if(userInfo){
           props.history.push(redirect)
       }
    },[props.history, redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger"> {error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        SignIn
                    </button>
                </div>
                <label/>
                <div>
                    New customer ?{''}
                    <Link to={`/register?redirect=${redirect
                    }`}>Create account</Link>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
