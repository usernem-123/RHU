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
        $records = Records::all();
        return Inertia::render('Records', ['records' => $records]);
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
}
