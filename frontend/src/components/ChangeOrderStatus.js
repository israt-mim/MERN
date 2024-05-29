import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import ORDER_STATUS from '../common/orderStatus';

const ChangeOrderStatus = ({ orderId, customerName, status, onClose, fetchdata }) => {
    const [orderStatus, setOrderStatus] = useState(status);

    const handleOnChangeSelect = (e) => {
        setOrderStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateOrder.url, {
                method: SummaryApi.updateOrder.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    orderStatus
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchdata();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <IoMdClose className="text-gray-600 w-6 h-6" />
                </button>

                <h1 className="text-xl font-semibold mb-4">Change Order Status</h1>

                <div className="mb-4">
                    <p className="font-semibold">Order Id:</p>
                    <p>{orderId}</p>
                </div>

                <div className="mb-4">
                    <p className="font-semibold">Ordered By:</p>
                    <p>{customerName}</p>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold">Status:</p>
                    <select className="border px-4 py-1" value={orderStatus} onChange={handleOnChangeSelect}>
                        {Object.values(ORDER_STATUS).map((el) => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    onClick={updateOrderStatus}
                >
                    Change Status
                </button>
            </div>
        </div>
    );
};

export default ChangeOrderStatus;
