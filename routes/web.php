<?php

use App\Http\Controllers\RHUserController;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {
    Route::get('/login', [RHUserController::class, 'showLogin'])->name('login');
    Route::post('/login', [RHUserController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [RHUserController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [RHUserController::class, 'logout'])->name('logout');
});