<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Patientes;

class PatientController extends Controller
{
    public function showPatients()
    {
        $patients = Patientes::with('records')->get();
        return Inertia::render('Patients', ['patients' => $patients]);
    }

    public function addPatient(Request $req)
    {
        Patientes::create([
            'name'           => $req->name,
            'address'        => $req->address,
            'gender'         => $req->gender,
            'contact_number' => $req->contact_number,
            'birthday'       => $req->birthday,
        ]);
        return redirect()->back();
    }

    public function updatePatient(Request $req, $id)
    {
        Patientes::findOrFail($id)->update([
            'name'           => $req->name,
            'address'        => $req->address,
            'gender'         => $req->gender,
            'contact_number' => $req->contact_number,
            'birthday'       => $req->birthday,
        ]);
        return redirect()->back();
    }

    public function deletePatient($id)
    {
        Patientes::findOrFail($id)->delete();
        return redirect()->back();
    }
}