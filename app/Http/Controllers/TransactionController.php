<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Patientes;

class TransactionController extends Controller
{
    public function showTransactions(){
        $trans = Transaction::with('patient')->get();
        $patients = Patientes::select('id', 'name')->orderBy('name')->get();
        return Inertia::render('Transactions', [
            'transactions' => $trans,
            'patients' => $patients,
        ]);
    }

    public function addTransaction(Request $req){
        $trans = Transaction::create([
            'transaction_id' => $req->transaction_id,
            'type' => $req->type,
            'payment' => $req->payment,
            'patient_id' => $req->patient_id,
        ]);
        return redirect()->back();
    }

    public function deleteTransaction($id){
        $trans = Transaction::findOrFail($id);
        $trans->delete();
        return redirect()->back();
    }
}
