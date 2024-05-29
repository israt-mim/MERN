import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

const PaymentFailedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed at this time. Please try again later or contact support.
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => window.location.href = '/cart'}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
