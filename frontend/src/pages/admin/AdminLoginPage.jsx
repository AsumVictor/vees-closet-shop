import { useEffect, useState } from 'react';
import server from '../../server';
import { LabelInput } from '../../components/inputs/labelInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

function AdminLoginPage() {
    const { isAuthenticated } = useSelector((state) => state.client);
    const { state } = useLocation();
    const path = state?.pathname ? state.pathname : '/';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const canSubmit = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const userIformation = {
            email,
            password,
        };

        axios
            .post(`${server}shop/auth01`, userIformation)
            .then((res) => {
                setEmail('');
                setPassword('');
                navigate(path, { replace: true });
                window.location.reload(true);
            })
            .catch((err) => {
                setLoading(false);
                let errMessage = err.response?.data ? err.response.data.message : err.message;
                setError(errMessage);
            });
    };

    useEffect(() => {}, []);

    return (
        <div className="w-full  overflow-y-auto h-screen py-20 flex flex-col justify-center items-center px-3">
            <Helmet>
                <title>Login - Vees closet </title>
            </Helmet>

            <img src="" alt="" />
            <h1 className="text-2xl font-medium uppercase underline">Admin</h1>
            <h1 className="text-xl font-medium mt-2">Welcome to Vees closet</h1>
            <p className="mt-5 py-1 w-full 400px:w-[10cm] text-center">
                Login in to manage shop activities
            </p>
            <form className=" mt-10 py-1 w-full 400px:w-[10cm]" onSubmit={(e) => handleSubmit(e)}>
                {error && <p className="text-red-800 text-center bg-red-100 py-1  mb-3">{error}</p>}
                <div className="w-full flex flex-col gap-4">
                    <LabelInput
                        label={'email'}
                        type={'email'}
                        isRequired={true}
                        value={email}
                        handleChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                        }}
                    />
                    <div className="flex flex-col w-full">
                        <LabelInput
                            type={'password'}
                            label={'password'}
                            isRequired={true}
                            value={password}
                            handleChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className=" disabled:opacity-50 py-2 bg-primary-800 text-white font-semibold"
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </div>
                <p className="mt-2 text-blue-500 underline cursor-pointer">
                    Have issues accessing account ?
                </p>
            </form>
        </div>
    );
}

export default AdminLoginPage;
