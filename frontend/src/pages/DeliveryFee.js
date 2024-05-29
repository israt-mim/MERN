import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { MdCancel, MdModeEdit } from 'react-icons/md';

const DeliveryFee = () => {
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState({
        deliveryFee: 0,
    });

    const fetchDeliveryFee = async () => {
        try {
            const fetchData = await fetch(SummaryApi.getDeliveryFee.url, {
                method: SummaryApi.getDeliveryFee.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setDeliveryFee(dataResponse.data.deliveryFee);
                setData({ deliveryFee: dataResponse.data.deliveryFee });
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching delivery fee:', error);
            toast.error('Failed to fetch delivery fee');
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const deliveryData = {
            deliveryFee: data.deliveryFee,
        };

        try {
            const response = await fetch(SummaryApi.updateDeliveryFee.url, {
                method: SummaryApi.updateDeliveryFee.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(deliveryData),
            });

            if (response.status === 200) {
                toast.success('Delivery Fee Updated!');
                fetchDeliveryFee();
                setIsEditMode(false);
            } else {
                toast.error('Something went wrong. Please try again!');
            }
        } catch (error) {
            console.error('Error updating delivery fee:', error);
            toast.error('Failed to update delivery fee');
        }
    };

    const handleCancelEdit = () => {
        setData({ deliveryFee: deliveryFee });
        setIsEditMode(false);
    };

    useEffect(() => {
        fetchDeliveryFee();
    }, []);

    return (
        <div className="bg-white p-4 min-h-36 rounded border">
            <h1 className="text-2xl font-bold text-gray-800">Delivery Charge</h1>

            <div className="flex gap-2 items-center h-full pb-2 w-full gap-2 my-10">
                <div className="min-w-[200px] md:min-w-[500px]">
                    <label htmlFor="productName">Delivery Fee : </label>
                    <input
                        type="number"
                        id="deliveryFee"
                        placeholder="Enter Delivery Fee"
                        name="deliveryFee"
                        value={data?.deliveryFee}
                        min={0}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded w-[calc(100%-110px)] focus:outline-none focus:border-blue-400"
                        disabled={!isEditMode}
                        required
                    />
                </div>
                <div className="flex items-center gap-2 w-20">
                    {isEditMode ? (
                        <>
                            <button
                                className="px-4 py-1.5 border border-green-500 bg-green-400 hover:bg-green-500 rounded-full focus:outline-none"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                            <button
                                className="flex items-center gap-2 bg-red-500 py-1.5 px-4 rounded-full cursor-pointer hover:bg-red-600 text-white focus:outline-none"
                                onClick={handleCancelEdit}
                            >
                                <MdCancel /> Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white focus:outline-none"
                            onClick={() => setIsEditMode(true)}
                        >
                            <MdModeEdit />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryFee;
