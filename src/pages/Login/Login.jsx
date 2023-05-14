import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const notify = () => toast.success('Login Successfully', {
        style: {
            background: 'linear-gradient(155deg,  #ffcc66, #66ff66)'
        }
    });
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const loggedUser = {
                    email: user.email
                }
                console.log(loggedUser);
                navigate(from, { replace: true })
                form.reset();
                notify();
                fetch('https://server-car-doctor-sanad-bhowmik.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data);
                        localStorage.setItem('car-access-token', data.token);
                    })
            })
            .catch(error => console.log(error));
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-16 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-[#FF3811]" type="submit" value="login" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New to Car Doctors? <Link className='text-orange-600 font-bold font-serif' to='/signup'>Sign up</Link> </p>
                        <SocialLogin/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;