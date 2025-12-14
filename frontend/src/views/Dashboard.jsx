import { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import AppointmentForm from '../components/AppointmentForm';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch appointments
    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const { data } = await axiosClient.get('/appointments');
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">Timyo</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Your Appointment Dashboard</p>
                </div>

                {/* Appointment Form */}
                <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">New Appointment</h2>
                    <AppointmentForm onSuccess={fetchAppointments} />
                </div>

                {/* Appointment List */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Appointments</h2>

                    {loading ? (
                        <p className="text-gray-500 text-center">Loading...</p>
                    ) : appointments.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-gray-500">No appointments yet. Book one above!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {appointments.map((apt) => (
                                <div key={apt.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow dark:bg-gray-800 border-l-4 border-emerald-500">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{apt.title}</h3>
                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p><span className="font-semibold">Start:</span> {new Date(apt.start_time).toLocaleString()}</p>
                                        <p><span className="font-semibold">End:</span> {new Date(apt.end_time).toLocaleString()}</p>
                                    </div>
                                    {apt.notes && (
                                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic">"{apt.notes}"</p>
                                    )}
                                    <div className="mt-3">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${apt.status === 'scheduled' ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500/20' :
                                                apt.status === 'canceled' ? 'bg-red-50 text-red-800 ring-1 ring-red-500/20' :
                                                    'bg-gray-50 text-gray-800 ring-1 ring-gray-500/20'
                                            }`}>
                                            {apt.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
