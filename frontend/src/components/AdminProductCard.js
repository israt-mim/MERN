import React, { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayBDCurrency from "../helpers/displayCurrency";
import AdminDeleteProduct from "./AdminDeleteProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="w-32 h-40 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="object-fit w-full h-full"
          />
        </div>
        <h1 className="text-lg font-semibold mt-4 mb-2">{data.productName}</h1>
        <p className="text-gray-700 mb-2">{displayBDCurrency(data.sellingPrice)}</p>
        <div className="flex items-center justify-center">
          <button
            className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 ml-2 focus:outline-none"
            onClick={() => setDeleteProduct(true)}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}

      {deleteProduct && (
        <AdminDeleteProduct
          productData={data}
          onClose={() => setDeleteProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
