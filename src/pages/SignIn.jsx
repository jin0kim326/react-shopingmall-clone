import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
    const [user, setUser] = useState({email:'', password:''}); // 회원가입정보 
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const {email, password} = user;
        

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`🔥에러발생 : ${errorCode}::> ${errorMessage}`);
        });
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    return (
        <div>
            <form onSubmit={handleSignUp}onChange={handleChange}>
                <input type="email" name='email'/>
                <input type="password" name='password'/>
                <button>submit</button>
            </form>
        </div>
    );
}

