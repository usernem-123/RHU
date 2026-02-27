<?php

namespace App\Http\Controllers;

use App\Models\RHUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RHUserController extends Controller
{
    public function fetchUsers()
    {
        $users = RHUser::all();
        return Inertia::render('LP', [
            'fetchUsers' => $users
        ]);
    }
}
