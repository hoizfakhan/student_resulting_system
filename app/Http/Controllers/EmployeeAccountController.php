<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployeeAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/accounts/employee/Index",[
            'usertype' => $usertype,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $usertype=Auth()->user()->usertype;
        return Inertia("admin/accounts/employee/Create",[
            'usertype' => $usertype,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //

    }
}
