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

function CategoriesPage() {
    const { isLoading, isError, isVariation, category } = useSelector((state) => state.categories);
    const [newCategory, setNewCategory] = useState({
        name: '',
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

    const addNewCategory = async () => {
        if (newCategory.name.trim() === '') {
            return null;
        }
        setAdding(true);
        try {
            let res = await axios.post(`${server}category/create-category`, newCategory);
            if (res.data.success) {
                toast.success('Category Added successfully', {
                    toastId: 'success-add-c',
                });
                setNewCategory({
                    name: '',
                });
                setAdding(false);
                dispatch({
                    type: 'addNewCategory',
                    payload: res.data.new_category,
                });
            }
        } catch (error) {
            setAdding(false);
            let err = error.response?.data?.message ? error.response.data.message : error.message;
            toast.error(err, {
                toastId: 'v-errror-c',
            });
        }
    };

    return (
        <div className="w-full py-1 ">
            <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
                <Link to={'..'} relative={'path'} className=" 650px:hidden">
                    <MdOutlineKeyboardBackspace size={31} />
                </Link>
                <h1 className="text-xl">Product Categories</h1>
            </div>
            <div className="mt-5 flex flex-wrap gap-5">
                {category.map((c) => (
                    <span
                        key={c._id}
                        className=" capitalize py-2 px-3 rounded-md bg-emerald-500 text-white font-semibold"
                    >
                        {c.name}
                    </span>
                ))}
            </div>
            <h3 className=" text-center text-xl font-medium mt-5 underline">Add new Category</h3>
            <div className=" bg-white grid grid-cols-6 gap-2 py-2 px-2 ">
                <input
                    placeholder="Add new category"
                    value={newCategory.name}
                    onChange={(e) =>
                        setNewCategory((prev) => {
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
                    onClick={() => addNewCategory()}
                    className=" disabled:opacity-50 text-[14px] px-3 py-1 bg-blue-600 text-white font-medium rounded-md col-span-2"
                >
                    {isAadding ? 'Adding ...' : 'Add New'}
                </button>
            </div>
        </div>
    );
}

export default CategoriesPage;
