<?php

use App\Http\Controllers\RHUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordsController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\TransactionController;


Route::middleware('guest')->group(function () {
    Route::get('/', [RHUserController::class, 'showLogin'])->name('login');
    Route::post('/login', [RHUserController::class, 'login']);
});

Route::middleware('auth')->group(function () {

    // Auth
    Route::get('/dashboard', [RHUserController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [RHUserController::class, 'logout'])->name('logout');

    // Records
    Route::prefix('records')->name('records.')->group(function () {
        Route::get('/', [RecordsController::class, 'showRecords'])->name('index');
        Route::post('/', [RecordsController::class, 'addRecord'])->name('store');
        Route::patch('/{id}', [RecordsController::class, 'updateRecord'])->name('update');
        Route::delete('/{id}', [RecordsController::class, 'deleteRecord'])->name('destroy');
    });

    // Patients
    Route::prefix('patients')->name('patients.')->group(function () {
        Route::get('/', [PatientController::class, 'showPatients'])->name('index');
        Route::post('/', [PatientController::class, 'addPatient'])->name('store');
        Route::patch('/{id}', [PatientController::class, 'updatePatient'])->name('update');
        Route::delete('/{id}', [PatientController::class, 'deletePatient'])->name('destroy');
    });

    Route::prefix('transactions')->name('transactions.')->group(function () {
        Route::get('/', [TransactionController::class, 'showTransactions'])->name('index');
        Route::post('/', [TransactionController::class, 'addTransaction'])->name('store');
        Route::delete('/{id}', [TransactionController::class, 'deleteTransaction'])->name('destroy');
    });

});