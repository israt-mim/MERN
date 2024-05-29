import React from "react";
import { CgClose } from "react-icons/cg";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminDeleteProduct = ({ onClose, productData, fetchdata }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData?.message);
            fetchdata();
            onClose();
        }

        if (responseData.error) {
            toast.error(responseData?.message);
        }
    }

    return (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[200px] overflow-hidden flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center pb-3">
                        <h2 className="font-bold text-lg">Delete Product</h2>
                        <div
                            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
                            onClick={onClose}
                        >
                            <CgClose />
                        </div>
                    </div>

                    <div className="">
                        Are you sure you want to delete <span className="font-semibold">{productData?.productName}</span>?
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <button className="bg-red-500 hover:bg-red-600 px-3 py-1 border rounded text-white" onClick={handleDelete}>
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDeleteProduct;
