import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import AppointmentForm from "../components/AppointmentForm";

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = () => {
        setLoading(true);
        axiosClient.get('/appointments')
            .then(({ data }) => {
                setAppointments(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="space-y-6 px-4 py-6 sm:px-0">
            {/* Top Section: Welcome & Actions */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <AppointmentForm onSuccess={fetchAppointments} />
                    </div>
                </div>

                {/* Right Column: Appointment List */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-gray-700">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Your Appointments</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your upcoming and past bookings.</p>
                        </div>

                        <div className="px-4 py-5 sm:p-6">
                            {loading && (
                                <div className="flex justify-center py-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                                </div>
                            )}

                            {!loading && appointments.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No appointments</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new appointment.</p>
                                </div>
                            )}

                            {!loading && appointments.length > 0 && (
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {appointments.map(apt => (
                                        <li key={apt.id} className="py-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{apt.title}</h3>
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${apt.status === 'scheduled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                                apt.status === 'canceled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                            }`}>
                                                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-medium">Start:</span> {new Date(apt.start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-medium">End:</span> {new Date(apt.end_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                                    </p>
                                                    {apt.notes && (
                                                        <div className="mt-2 rounded-md bg-gray-50 p-2 text-sm text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
                                                            "{apt.notes}"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
