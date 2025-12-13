<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get all users (Admin only).
     */
    public function users()
    {
        return User::where('role', '!=', 'admin')->get();
    }

    /**
     * Get all appointments (Admin only).
     */
    public function appointments()
    {
        return Appointment::with('user')->orderBy('start_time', 'desc')->get();
    }
}
