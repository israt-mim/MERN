// src/Invoice.js
import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MdArrowBack } from 'react-icons/md';

const OrderDetails = ({ invoiceData, handleBack }) => {
    const {
        customerName,
        customerPhoneNumber,
        customerAddress,
        customerEmail,
        orderStatus,
        totalAmount,
        deliveryFee,
        products,
        createdAt,
        _id: orderId,
    } = invoiceData;

    const invoiceRef = useRef();

    const handleDownloadPdf = () => {
        const input = invoiceRef.current;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${customerName}-invoice.pdf`);
            });
    };

    return (
        <div className='bg-white p-4'>
            <div className='flex items-center gap-2 cursor-pointer hover:text-red-500' onClick={handleBack}><MdArrowBack size={20}/> Back</div>
            <div ref={invoiceRef} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Invoice</h2>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Customer Information</h3>
                    <p><strong>Name:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhoneNumber}</p>
                    <p><strong>Address:</strong> {customerAddress}</p>
                    <p><strong>Email:</strong> {customerEmail}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Order Information</h3>
                    <p><strong>Order Id:</strong> {orderId}</p>
                    <p><strong>Payment Status:</strong> {orderStatus}</p>
                    <p><strong>Order Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Products Details</h3>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className='text-left'>
                                <th className="py-2">Product Name</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Discount Price</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{product.productId?.productName}</td>
                                    <td className="py-2">{product.productId?.price?.toFixed(2)}</td>
                                    <td className="py-2">{product.productId?.sellingPrice?.toFixed(2)}</td>
                                    <td className="py-2">{product.quantity}</td>
                                    <td className="py-2">{(product.quantity * product.productId?.sellingPrice?.toFixed(2))?.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className='border-t'>
                                <td colSpan={3}>

                                </td>
                                <td>
                                    <p><strong>Total Amount:</strong></p>
                                    <p><strong>Delivery Fee:</strong></p>
                                    <p><strong>Grand Total:</strong></p>
                                </td>
                                <td >
                                    <p><strong>{totalAmount - deliveryFee}</strong></p>
                                    <p><strong>{deliveryFee}</strong></p>
                                    <p><strong>{totalAmount}</strong></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' flex justify-center w-full'>
            <button
                onClick={handleDownloadPdf}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Save as PDF
            </button>
            </div>
        </div>
    );
};

export default OrderDetails;
