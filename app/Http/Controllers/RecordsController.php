<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Records;
use App\Models\Patientes;

class RecordsController extends Controller
{
    public function showRecords()
    {

        $records = Records::with('patiente')->get();
        $patients = Patientes::select('id', 'name')->orderBy('name')->get();
        return Inertia::render('Records', ['records' => $records, 'patients' => $patients]);
    }

    public function updateRecord(Request $req)
    {
        $record = Records::findorFail($req->id);
        $record->update([
            'type' => $req->type,
            'description' => $req->description
        ]);

        return redirect()->back();
    }

    public function deleteRecord(Request $req)
    {
        $record = Records::findorFail($req->id);
        $record->delete();

        return redirect()->back();
    }

    public function addRecord(Request $req){
        $record = Records::create([
            'type' => $req->type,
            'description' => $req->description,
            'patientes_id' => $req->patientes_id
        ]);

        return redirect()->back();
    }
}
