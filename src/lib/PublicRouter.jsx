import React, { useEffect, useState } from 'react';
import { onUserStateChange } from '../config/firebase';
import { Navigate, Route } from 'react-router-dom';

export default function PublicRouter({component:Component, restricted, ...rest}) {
    const [user, setUser] = useState();
    
    useEffect(()=>{
        onUserStateChange((user)=>{
            setUser(user);
        });
    },[])

    return (
        <Route
            {...rest}
            render={(props) => 
                user.isAdmin && restricted ? <Navigate to="/" /> : <Component {...props}/>
            }
        />
    );
}

