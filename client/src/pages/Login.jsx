import { useState, useEffect } from 'react';
import { InputLabel, CheckboxLabel, Button } from '../components/Inputs';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import server from '../../server';
import Loader from '../components/loader/loader';
import { useSelector } from 'react-redux';

function Login() {
    const { isAuthenticated } = useSelector((state) => state.user);
    const { state } = useLocation();
    const path = state?.pathname ? state.pathname : '/';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const canSubmit = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userIformation = {
            email,
            password,
        };

        axios
            .post(`${server}/user/auth0`, userIformation)
            .then((res) => {
                toast.success('Success');
                setEmail('');
                setPassword('');
                navigate(path, { replace: true });
                window.location.reload(true);
            })
            .catch((err) => {
                setLoading(false);
                let errMessage = err.response ? err.response.data.message : err.message;
                toast.error(errMessage);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(path);
        }
    }, []);

    return (
        <div className="grid grid-cols-1 w-full min-h-screen">
            <div className="py-3 w-full flex flex-col justify-center items-center h-screen">
                <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl py-10 px-5">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-wine_primary capitalize text-center">
                        Customer login
                    </h4>
                    <p className="text-center">We're excited to welcome you</p>
                    {state?.message && (
                        <p className="text-center mt-3 text-red-600 font-semibold bg-red-100 py-1 rounded-md">
                            {state.message}
                        </p>
                    )}
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <InputLabel
                                label={'Email'}
                                type={'email'}
                                value={email}
                                handleChange={(e) => setEmail(e.target.value)}
                                name={'userEmail'}
                            />
                            <InputLabel
                                label={'Password'}
                                type={'password'}
                                value={password}
                                handleChange={(e) => setPassword(e.target.value)}
                                name={'userPassword'}
                            />
                        </div>
                        <div className="grid w-full grid-cols-2">
                            <div className="flex items-center">
                                <CheckboxLabel />
                                Remember me
                            </div>
                            <div className="flex items-center justify-end">
                                <a
                                    className="font-medium text-wine_primary transition-colors hover:text-blue-700"
                                    href="#"
                                >
                                    Forget password
                                </a>
                            </div>
                        </div>
                        <Button
                            classname={
                                'mt-6 bg-wine_primary w-full flex justify-center items-center'
                            }
                            disabled={!canSubmit || loading}
                            handleClick={handleSubmit}
                        >
                            {loading ? (
                                <Loader
                                    extendclass={`h-[.7cm] w-[.7cm] border-[5px] border-white`}
                                />
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <p className="mt-4 text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased flex flex-row gap-1">
                            I don't have an account?
                            <Link
                                className="font-medium text-wine_primary transition-colors hover:text-blue-700"
                                to="../signup"
                            >
                                Create account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
