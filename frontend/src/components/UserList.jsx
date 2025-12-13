import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/admin/users')
            .then(({ data }) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading users...</div>;

    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{user.name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
