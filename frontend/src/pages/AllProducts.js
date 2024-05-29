import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Filter products based on search term
  const filteredProducts = allProduct.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white w-full rounded border">
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <div className='flex items-center gap-4'>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <div className="w-[320px]">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <AdminProductCard data={product} key={index} fetchdata={fetchAllProduct} />
          ))}
        </div>
      </div>

      {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />}
    </div>
  );
};

export default AllProducts;
