import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(SummaryApi.getRecentOrders.url, {
                method: SummaryApi.getRecentOrders.method,
                credentials: 'include',
            });
            const dataResponse = await response.json();
            setOrders(dataResponse);
        };

        fetchOrders();
    }, []);

    return (
        <div className='w-full border rounded p-2 shadow-lg'>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-500">Transaction ID</th>
                            <th className="px-4 py-2 border border-gray-500">Customer Name</th>
                            <th className="px-4 py-2 border border-gray-500">Phone Number</th>
                            <th className="px-4 py-2 border border-gray-500">Address</th>
                            <th className="px-4 py-2 border border-gray-500">Email</th>
                            <th className="px-4 py-2 border border-gray-500">Order Status</th>
                            <th className="px-4 py-2 border border-gray-500">Total Amount</th>
                            <th className="px-4 py-2 border border-gray-500">Delivery Fee</th>
                            <th className="px-4 py-2 border border-gray-500">Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{order.transactionId}</td>
                                <td className="border px-4 py-2">{order.customerName}</td>
                                <td className="border px-4 py-2">{order.customerPhoneNumber}</td>
                                <td className="border px-4 py-2">{order.customerAddress}</td>
                                <td className="border px-4 py-2">{order.customerEmail}</td>
                                <td className="border px-4 py-2">{order.orderStatus}</td>
                                <td className="border px-4 py-2">{order.totalAmount}</td>
                                <td className="border px-4 py-2">{order.deliveryFee}</td>
                                <td className="border px-4 py-2">
                                    <ul className="list-disc list-inside">
                                        {order.products.map(product => (
                                            <li key={product.productId._id}>
                                                {product.productId.productName} - Quantity: {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
