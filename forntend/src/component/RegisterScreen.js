import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../action/UserAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function RegisterScreen(props) {
    const[email,setEmail] = useState('')
    const[name,setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';
    
    const userRegister = useSelector((state)=> state.userRegister);
    const {userInfo, loading, error} = userRegister;


    const dispatch = useDispatch();

    const submitHandler=(e) =>{
        e.preventDefault();
        if(password !== confirmpassword){
            alert('Password are not matching')
        }else{
            dispatch(register(name,email, password))
        }
        
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
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger"> {error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" placeholder="Enter your name" required onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your Email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmpassword">Enter confirmPassword</label>
                    <input type="password" id="confirmpassword" placeholder="Enter your confirm password" required onChange={e => setConfirmpassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <label/>
                <div>
                    Already SignIn ?{''}
                    <Link to={`/signin?redirect=${redirect
                    }`}>SignIn</Link>
                </div>
            </form>
        </div>
    )

}

export default RegisterScreen
