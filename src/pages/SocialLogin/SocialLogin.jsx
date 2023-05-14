import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import img from '../../assets/icons/google.png'

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center'>
                <button onClick={handleGoogleSignIn} className='btn border-none btn-outline'>
                    <img className='h-10' src={img} alt="" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;