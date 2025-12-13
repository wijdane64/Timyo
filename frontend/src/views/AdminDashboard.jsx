import UserList from "../components/UserList";

export default function AdminDashboard() {
    return (
        <div className="space-y-6 px-4 py-6 sm:px-0">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Admin Portal
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* User Management Section */}
                <div className="col-span-1 lg:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-gray-700">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">User Management</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and manage registered users.</p>
                        </div>
                        <div className="p-4">
                            <UserList />
                        </div>
                    </div>
                </div>

                {/* Placeholder for future admin stats or appointment oversight */}
                {/* 
                <div className="col-span-1">
                     <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">System Stats</h3>
                            <div className="mt-2 text-sm text-gray-500">Coming soon...</div>
                        </div>
                     </div>
                </div>
                */}
            </div>
        </div>
    );
}
