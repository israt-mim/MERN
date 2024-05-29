import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your payment has been successfully processed.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => window.location.href = '/'}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
