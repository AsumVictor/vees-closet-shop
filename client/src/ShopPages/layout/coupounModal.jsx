import React, { useState } from 'react';
import { Button, InputLabel } from '../../components/Inputs';
import Loader from '../../components/loader/loader';
import { toast } from 'react-toastify';
import { Switch } from '@material-tailwind/react';
import axios from 'axios';
import server from '../../../server';

function CoupounModal({ actions }) {
    const [setOpen, setCoupouns] = actions;
    const [coupoun, setCoupoun] = useState({
        code: '',
        discountType: 'fixed',
        discountValue: '',
        minimumAmount: null,
        maximumAmount: null,
        expirationDate: null,
    });
    const [generating, setGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [check, setCheck] = useState(false);

    const generateRandomString = () => {
        setGenerating(true);
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const minLength = 5;
        const maxLength = 10;
        const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let code = '';

        for (let i = 0; i < randomLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        setTimeout(() => {
            setGenerating(false);
            toast.success(
                <>
                    Code <span className=" text-wine_primary font-bold">{code} </span>
                    generated
                </>
            );
            setCoupoun((prev) => {
                return { ...prev, code: code };
            });
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoupoun((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (coupoun.code.trim() === '' || coupoun.discountValue.trim() === '') {
                toast.error('Please fill the required fields!');
                return null;
            }
            let { data } = await axios.post(`${server}/coupon/create-coupon-code`, coupoun);

            if (data.success) {
                toast.success('You have added a coupoun');
                setCoupouns((prev) => {
                    const coupoun = data.coupounCode;
                    return [coupoun, ...prev];
                });
                setOpen(false);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            let errMesg = error.response ? error.response.data.message : error.message;
            toast.error(errMesg);
        }
    };

    return (
        <div className="absolute top-0 left-0 backdrop-blur-md overflow-y-auto w-full h-screen py-10 z-10 px-2">
            <h3 className="px-2 text-center font-semibold text-xl">
                <span className="bg-white px-2 py-1 shadow-xl">Add new coupoun</span>
            </h3>
            <div className="flex justify-center">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="bg-white shadow-2xl border px-2 400px:px-10 py-2 w-full 400px:w-[12cm] rounded-xl"
                >
                    <InputLabel
                        label={'Coupoun Code *'}
                        handleChange={handleChange}
                        type={'text'}
                        name={'code'}
                        value={coupoun.code}
                    />

                    <Button
                        classname={'mt-3 bg-wine_primary w-[4cm] flex justify-center items-center'}
                        handleClick={generateRandomString}
                    >
                        {generating ? (
                            <Loader extendclass={`h-[.7cm] w-[.7cm] border-[5px] border-white`} />
                        ) : (
                            'Generate code'
                        )}
                    </Button>

                    <div className="w-full mt-5">
                        <InputLabel
                            label={'Coupoun Value (Default ₵) *'}
                            handleChange={handleChange}
                            type={'number'}
                            name={'discountValue'}
                            value={coupoun.discountValue}
                        />
                        <div className="w-full flex flex-row gap-3">
                            <Switch
                                color={'brown'}
                                checked={check}
                                value={coupoun.discountType === 'percentage' ? true : false}
                                onChange={(e) => {
                                    setCoupoun((prev) => {
                                        return {
                                            ...prev,
                                            discountType: !check ? 'percentage' : 'fixed',
                                        };
                                    });
                                    setCheck((prev) => !prev);
                                }}
                            />
                            <span>Percentage</span>
                        </div>
                    </div>

                    <div className="w-full mt-5">
                        <InputLabel
                            label={'Minimum amount coupoun applies'}
                            handleChange={handleChange}
                            type={'number'}
                            name={'minimumAmount'}
                            value={coupoun.minimumAmount}
                        />
                    </div>

                    <div className="w-full mt-5">
                        <InputLabel
                            label={'Maximum amount coupoun applies'}
                            handleChange={handleChange}
                            type={'number'}
                            name={'maximumAmount'}
                            value={coupoun.maximumAmount}
                        />
                    </div>

                    <div className="w-full mt-5">
                        <InputLabel
                            label={'Expiring date'}
                            handleChange={handleChange}
                            type={'datetime-local'}
                            name={'expirationDate'}
                            value={coupoun.expirationDate}
                        />
                    </div>

                    <hr className="h-[0.1cm] w-full bg-gray-400 mt-5" />

                    <div className="col-span-full grid grid-cols-3 gap-3 mt-2">
                        <Button
                            type="button"
                            classname={
                                'bg-red-50  font-bold  col-span-1 w-full flex justify-center items-center'
                            }
                            handleClick={() => setOpen(false)}
                        >
                            <p className="text-red-700">CANCEL</p>
                        </Button>
                        <Button
                            classname={
                                'bg-wine_primary col-span-2 w-full flex justify-center items-center'
                            }
                            handleClick={handleSubmit}
                        >
                            {isLoading ? (
                                <Loader
                                    extendclass={`h-[.7cm] w-[.7cm] border-[5px] border-white`}
                                />
                            ) : (
                                'Add Coupon'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CoupounModal;
