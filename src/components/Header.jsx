import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginUser from './LoginUser';
import {BsFillPencilFill} from 'react-icons/bs'
import {FiShoppingBag} from 'react-icons/fi'
import { login, logout, onUserStateChange } from '../config/firebase';

export default function Header() {
    const [user, setUser] = useState();

    useEffect(()=>{
        onUserStateChange(setUser);
    })

    return (
            <header className='flex justify-between border-b border-gray-300 p-2'>
                <Link to='/' className='flex items-center text-4xl text-brand'>
                     <FiShoppingBag /> 
                     <h1>Shoopy</h1>
                 </Link>
                <nav className='flex items-center gap-4 font-semibold'>
                    <Link to='/products'>Products</Link> 
                    <Link to='/basket'>basket</Link>
                    <Link to='/products/add' className='text-2xl'>
                        <BsFillPencilFill />
                    </Link>
                    {user && <LoginUser user={user}/>}
                    {user ? 
                    <button onClick={logout}>Logout</button> :
                    <button onClick={login}>Login</button>
                    }
                </nav>
            </header>
    );
}

