<?php

use App\Http\Controllers\RHUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [RHUserController::class, 'fetchUsers']);