import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IoMdEye } from 'react-icons/io';
import OrderDetails from './OrderDetails';
import ORDER_STATUS from '../common/orderStatus';

const MyOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllOrders = async () => {
        try {
            const fetchData = await fetch(SummaryApi.getMyOrders.url, {
                method: SummaryApi.getMyOrders.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllOrders(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching all orders:', error);
            toast.error('Failed to fetch all orders');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleCloseShowDetails = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
    };

    // Filter orders based on search term
    const filteredOrders = allOrders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full p-4 bg-white rounded border">
            <header className="bg-white shadow-sm pb-4 flex justify-between items-center rounded">
                <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
                {!showOrderDetails &&
                    <div className="flex items-center w-[320px]">
                        <input
                            type="text"
                            placeholder="Search by order ID or customer name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mr-4 w-full"
                        />
                    </div>}

            </header>
            {showOrderDetails && selectedOrder ? (
                <OrderDetails invoiceData={selectedOrder} handleBack={handleCloseShowDetails} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-800 text-white text-center">
                                <th className="py-3">Sr.</th>
                                <th className="py-3">Order ID</th>
                                <th className="py-3">Name</th>
                                <th className="py-3">Address</th>
                                <th className="py-3">Phone</th>
                                <th className="py-3">Total Price</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Order Date</th>
                                <th className="py-3">Delivery Date</th>
                                <th className="py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No Data Found</td>
                                </tr>
                            ) :
                                filteredOrders.map((order, index) => (
                                    <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100 text-center' : 'bg-white text-center'}>
                                        <td className="py-4">{index + 1}</td>
                                        <td className="py-4">{order._id}</td>
                                        <td className="py-4">{order.customerName}</td>
                                        <td className="py-4">{order.customerAddress}</td>
                                        <td className="py-4">{order.customerPhoneNumber}</td>
                                        <td className="py-4">{order.totalAmount}</td>
                                        <td className="py-4">{order.orderStatus}</td>
                                        <td className="py-4">{moment(order.createdAt).format('LL')}</td>
                                        <td className="py-4">{order.orderStatus === ORDER_STATUS.DELIVERED ? moment(order.updatedAt).format('LL') : '-'}</td>
                                        <td className="py-4 flex items-center justify-center space-x-4">
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                onClick={() => {
                                                    setShowOrderDetails(true);
                                                    setSelectedOrder(order);
                                                }}
                                            >
                                                <IoMdEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
