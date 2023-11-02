import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

function LoginPage() {

    const signInUser = () => {
        signInWithPopup(auth, provider).catch(err => alert(err.message));
    }

    return (
        <div className='grid place-items-center mt-80'>
            
            <h1 className='text-4xl font-bold text-red-500'>Chatt App</h1>
        
            <button 
                onClick={signInUser}
                className='bg-gray-300 text-sm font-bold
                text-red-500 rounded-lg hover:scale-110 transition-all 
                duration-200 ease-in-out p-3 mt-5'>
                Entrar com Google
            </button>
        </div>
    )
}

export default LoginPage;