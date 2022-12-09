import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Navigate, Route } from 'react-router-dom';
import { onUserStateChange } from '../config/firebase';

export default function PrivateRoute({component : Component, ...rest}) {
    const [user, setUser] = useState();
    
    useEffect(()=>{
        onUserStateChange((user)=>{
            setUser(user);
        });
    },[])

    return (
        <Route
            {...rest}
            render = {(props) => {
                !user.isAdmin && 
                    FiAlertTriangle("접근 권한이 없습니다. 로그인 후 다시 시도하세요.");
                return user.isAdmin ? <Component {...props} /> : <Navigate to="/" />;
            }}
        />
    );
}

