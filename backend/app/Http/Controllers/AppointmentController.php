<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Users see only their own appointments
        return Auth::user()->appointments()->orderBy('start_time', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'notes' => 'nullable|string',
        ]);

        $appointment = Auth::user()->appointments()->create($validated);

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        $this->authorize('view', $appointment);
        return $appointment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        $this->authorize('update', $appointment);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'start_time' => 'sometimes|date',
            'end_time' => 'sometimes|date|after:start_time',
            'status' => 'sometimes|in:scheduled,completed,canceled',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return response()->json($appointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $this->authorize('delete', $appointment);
        
        $appointment->delete();

        return response()->json(['message' => 'Appointment canceled successfully']);
    }
}
