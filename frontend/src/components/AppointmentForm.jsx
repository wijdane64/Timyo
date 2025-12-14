import { useState } from 'react';
import axiosClient from '../axios-client';

export default function AppointmentForm({ onSuccess }) {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axiosClient.post('/appointments', {
                title,
                start_time: startTime,
                end_time: endTime,
                notes,
            });
            setTitle('');
            setStartTime('');
            setEndTime('');
            setNotes('');
            if (onSuccess) onSuccess();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setError(Object.values(err.response.data.errors).flat().join(' '));
            } else {
                setError('Failed to create appointment.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Book an Appointment</h3>

            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-100">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                    <input
                        type="datetime-local"
                        id="end_time"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes (Optional)</label>
                <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Booking...' : 'Book Appointment'}
                </button>
            </div>
        </form>
    );
}
