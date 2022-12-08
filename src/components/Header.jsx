import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import LoginUser from './LoginUser';
import { useQuery } from '@tanstack/react-query';
import {BsFillPencilFill} from 'react-icons/bs'
import {FiShoppingBag} from 'react-icons/fi'

export default function Header() {
    const [authId, setAuthId] = useState('');
    const {
        isLoading,
        error,
        data: auth
    } = useQuery(['auth', authId],() => {
        // const obj = { a : 'bbb', currentUser:'real'};
        // return obj;
        return getAuth()
      }
    );

    useEffect(() => {
    }, [auth])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            
          }).catch((error) => {
            // An error happened.
          });
    }

    
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p> 😿 {error}</p>}
            {auth && (
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
                    {auth.currentUser && <LoginUser user={auth.currentUser}/>}
                    {auth.currentUser ? 
                    <Link to='/' onClick={handleSignOut}>sign-out</Link> :
                    <Link to='/sign-in'><button>sign-in</button></Link> 
                    }
                </nav>
            </header>)}
        </>
    );
}

