import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Failed to update user role');
        }
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <IoMdClose className="text-gray-600 w-6 h-6" />
                </button>

                <h1 className="text-xl font-semibold mb-4">Change User Role</h1>

                <div className="mb-4">
                    <p className="font-semibold">Name:</p>
                    <p>{name}</p>
                </div>

                <div className="mb-4">
                    <p className="font-semibold">Email:</p>
                    <p>{email}</p>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold">Role:</p>
                    <select className="border px-4 py-1" value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map((el) => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
