<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RHUserController extends Controller
{
    
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function dashboard(){
        return Inertia::render('Dashboard');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $req){
        Auth::logout();
        
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return redirect('/login');
    }
}