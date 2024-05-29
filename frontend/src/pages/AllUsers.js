import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching all users:', error);
            toast.error('Failed to fetch all users');
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 w-full bg-white">
            <header className="bg-white shadow-sm pb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
                <div className="flex items-center w-[320px]">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md mr-4 w-full"
                    />
                </div>
            </header>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-800 text-white text-center">
                            <th className="py-3">Sr.</th>
                            <th className="py-3">Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Role</th>
                            <th className="py-3">Created Date</th>
                            <th className="py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100 text-center' : 'bg-white text-center'}>
                                <td className="py-4">{index + 1}</td>
                                <td className="py-4">{user.name}</td>
                                <td className="py-4">{user.email}</td>
                                <td className="py-4">{user.role}</td>
                                <td className="py-4">{moment(user.createdAt).format('LL')}</td>
                                <td className="py-4 flex items-center justify-center">
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                        onClick={() => {
                                            setUpdateUserDetails(user);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
