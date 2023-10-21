import React, { useState } from 'react';
import Variants from '../../components/admin/product/Variants.jsx';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from '../../components/loaders/pulseLoader.jsx';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import server from '../../server.js';
import { toast } from 'react-toastify';
import Error from '../../components/errorHandler/error.jsx';

function VariationPage() {
    const { isLoading, isError, isVariation, variation } = useSelector((state) => state.variations);
    const [newVariant, setNewVariant] = useState({
        name: '',
        values: [],
    });

    const [isAadding, setAdding] = useState(false);
    const dispatch = useDispatch();

    if (isLoading) {
        return <PulseLoader />;
    }

    if (isError) {
        return (
            <div className="mt-20 py-10">
                <Error message={'Failed to load data'} />
            </div>
        );
    }

    const addNewVariant = async () => {
        if (newVariant.name.trim() === '') {
            return null;
        }
        setAdding(true);
        try {
            let res = await axios.post(`${server}variation/create-variation`, newVariant);
            if (res.data.success) {
                toast.success('Variant Added successfully', {
                    toastId: 'success-add-v',
                });
                setNewVariant({
                    name: '',
                    values: [],
                });
                setAdding(false);
                dispatch({
                    type: 'addNewVariant',
                    payload: res.data.variation,
                });
            }
        } catch (error) {
            setAdding(false);
            let err = error.response?.data?.message ? error.response.data.message : error.message;
            toast.error(err, {
                toastId: 'v-errror-2',
            });
        }
    };

    return (
        <div className="w-full py-1 ">
            <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
                <Link to={'..'} relative={'path'} className=" 650px:hidden">
                    <MdOutlineKeyboardBackspace size={31} />
                </Link>
                <h1 className="text-xl">Product Variations</h1>
            </div>
            <div className=" grid gap-4 grid-cols-1">
                {variation.map((v) => (
                    <Variants data={v} key={v._id} />
                ))}
            </div>
            <h3 className=" text-center text-xl font-medium mt-5 underline">Add new Variant</h3>
            <div className=" bg-white grid grid-cols-6 gap-2 py-2 px-2 ">
                <input
                    placeholder="Add new product variant"
                    value={newVariant.name}
                    onChange={(e) =>
                        setNewVariant((prev) => {
                            return {
                                ...prev,
                                name: e.target.value,
                            };
                        })
                    }
                    type="text"
                    name="name"
                    id=""
                    className=" border-2 outline-none py-2 px-4 col-span-4 border-black"
                />
                <button
                    disabled={isAadding}
                    onClick={() => addNewVariant()}
                    className=" disabled:opacity-50 text-[14px] px-3 py-1 bg-blue-600 text-white font-medium rounded-md col-span-2"
                >
                    {isAadding ? 'Adding Variant...' : 'Add New variant'}
                </button>
            </div>
        </div>
    );
}

export default VariationPage;
