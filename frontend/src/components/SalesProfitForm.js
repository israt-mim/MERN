import React, { useState } from 'react';
import SummaryApi from '../common';

const SalesProfitForm = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [report, setReport] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.getSalesProfit.url, {
            method: SummaryApi.getSalesProfit.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ fromDate, toDate })
        });

        if (response.ok) {
            const salesProfitResponse = await response.json();
            setReport(salesProfitResponse);
        }
    };

    return (
        <div className='w-full min-h-40 border rounded p-4 shadow-lg'>
            <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
                <div className="flex-1">
                    <label className="mr-2">From Date:</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                    <label className="mr-2">To Date:</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6">Get Report</button>
            </form>
            {report && (
                <div className="mt-4 border border-gray-300 rounded-lg p-4">
                    <p><strong>Total Sold Products:</strong> {report.totalSoldProducts}</p>
                    <p><strong>Total Selling Price:</strong> {report.totalSellingPrice}</p>
                    <p><strong>Total Cost Price:</strong> {report.totalSellingPrice - report.totalProfit}</p>
                    <p><strong>Total Profit:</strong> {report.totalProfit}</p>
                </div>
            )}
        </div>
    );
};

export default SalesProfitForm;
