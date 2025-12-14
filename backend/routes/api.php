<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Public Routes
Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::get('/user', [App\Http\Controllers\AuthController::class, 'me']);

    // Appointment Routes
    Route::apiResource('appointments', App\Http\Controllers\AppointmentController::class);

    // Admin Routes
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('/users', [App\Http\Controllers\AdminController::class, 'users']);
        Route::get('/appointments', [App\Http\Controllers\AdminController::class, 'appointments']);
    });
});

