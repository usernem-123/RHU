<?php

use App\Http\Controllers\RHUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordsController;
use App\Http\Controllers\PatientController;


Route::middleware('guest')->group(function () {
    Route::get('/', [RHUserController::class, 'showLogin'])->name('login');
    Route::post('/login', [RHUserController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [RHUserController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [RHUserController::class, 'logout'])->name('logout');
    Route::get('/records', [RecordsController::class, 'showRecords'])->name('records');
    Route::post('/records', [RecordsController::class, 'addRecord']);
    Route::patch('/records/{id}', [RecordsController::class, 'updateRecord']);
    Route::delete('/records/{id}', [RecordsController::class, 'deleteRecord']);
    Route::get('/patients', [PatientController::class, 'showPatients'])->name('patients');
    Route::post('/patients', [PatientController::class, 'addPatient']);
    Route::patch('/patients/{id}', [PatientController::class, 'updatePatient']);
    Route::delete('/patients/{id}', [PatientController::class, 'deletePatient']);
});