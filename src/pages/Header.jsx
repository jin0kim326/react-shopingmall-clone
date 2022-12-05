import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Header() {
    const loginUser = getAuth();

    const handleSignOut = () => {
        signOut(loginUser).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <header>
            <div> logo </div>
            <div>
                <button>Products</button> 
                <button>basket</button>
                <button>add</button>
                <button>user</button>
                {loginUser ? 
                <button onClick={handleSignOut}>sign-out</button> :
                <Link to='/sign-in'><button>sign-in</button></Link> 
                }
            </div>
        </header>
    );
}

