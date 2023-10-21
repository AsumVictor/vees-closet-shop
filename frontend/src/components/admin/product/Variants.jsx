import React, { useState } from 'react';
import { AiFillCloseCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import TagInput from '../../inputs/tagInput';
import server from '../../../server';
import { toast } from 'react-toastify';
import { UpdateVariation } from '../../../redux/actions/variations';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Variants({ data }) {
    const [isOpen, setOpen] = useState(false);
    const [isUpdating, setUpdating] = useState(false);

    const [variant, setVariant] = useState(data);
    const dispatch = useDispatch();
    const addVariant = (data) => {
        setVariant((prev) => {
            const newValues = new Set(prev.values);
            newValues.add(data);
            return {
                ...prev,
                values: [...newValues],
            };
        });
    };

    const deleteVariant = (index) => {
        setVariant((prev) => {
            const newValues = prev.values.filter((i) => prev.values.indexOf(i) !== index);
            return {
                ...prev,
                values: newValues,
            };
        });
    };

    const updateVariation = async () => {
        try {
            setUpdating(true);
            let res = await axios.put(`${server}variation/edit-variation`, variant);
            if (res.data.success) {
                dispatch(UpdateVariation());
                toast.success('Variation update successfuly', {
                    toastId: 34,
                });
                setUpdating(false);
            }
        } catch (error) {
            setUpdating(false);
            let err = error.response?.data?.message ? error.response?.data?.message : error.message;
            toast.error(err, {
                toastId: 'update-error',
            });
        }
    };

    return (
        <div className="w-full border py-2 bg-white px-3">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex flex-row gap-2 items-center bg-emerald-400 px-2 py-1 rounded-md text-white  font-medium capitalize"
            >
                {isOpen ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
                <span>{variant.name} Variants</span>
            </button>
            {isOpen && (
                <div className="w-full ">
                    <div className="mt-4 px-5 w-full flex gap-3 flex-wrap">
                        {variant.values.map((v, index) => (
                            <div className="relative px-4 py-1 bg-blue-400 rounded-md text-white font-semibold text-[14px] capitalize">
                                <span>{v}</span>
                                <button
                                    onClick={() => deleteVariant(index)}
                                    className=" absolute -top-1 -right-1 text-black"
                                >
                                    <AiFillCloseCircle size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex justify-center items-center mt-3 gap-2">
                        <div className="w-full 350px:w-[250px]">
                            <TagInput name={variant.name} handleWordBreak={addVariant} />
                        </div>
                        <button
                            disabled={isUpdating}
                            onClick={() => updateVariation()}
                            className=" px-3 bg-black h-[0.952cm] text-white disabled:opacity-50"
                        >
                            {isUpdating ? 'Updating...' : `Update ${variant.name}`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Variants;
