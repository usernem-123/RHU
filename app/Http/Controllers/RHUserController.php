<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Records;
use App\Models\Patientes;

class RHUserController extends Controller
{
    
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function dashboard(){
        $trans = Transaction::with('patient')->latest()->get();
        $records = Records::with('patiente')->latest()->get();
        $patients = Patientes::all();

        return Inertia::render('Dashboard' , [
            'transactions' => $trans,
            'records' => $records,
            'patients' => $patients
        ]);
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
        return redirect()->route('login');
    }
}