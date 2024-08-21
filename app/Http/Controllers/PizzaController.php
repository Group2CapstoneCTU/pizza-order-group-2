<?php
// app/Http/Controllers/PizzaController.php

namespace App\Http\Controllers;

use App\Models\Pizza;            // Importing the Pizza model for database interactions
use Illuminate\Http\Request;     // Importing the Request class to handle HTTP requests
use Inertia\Inertia;             // Importing Inertia for rendering React components
use Illuminate\Support\Facades\Validator;

class PizzaController extends Controller
{
    // Method to display all pizzas on the homepage
    public function index()
    {
        $pizzas = Pizza::all();  // Retrieve all pizzas from the database


        if (request()->expectsJson()) {
            return response()->json($pizzas);
        }

        // Render the HomePage component and pass the list of pizzas to it
        return Inertia::render('HomePage', ['pizzas' => $pizzas]);

        // Note: The following return statement will never be executed because of the return above.
        return Inertia::render('Pizza', [
            'pizzas' => $pizzas,
        ]);
    }

    // Method to show details for a single pizza
    public function show($id)
    {
        $pizza = Pizza::find($id);  // Find the pizza by its ID

        // Render the PizzaDetailPage component and pass the pizza data to it
        return Inertia::render('PizzaDetailPage', ['pizza' => $pizza]);
    }


//Needs to be fixed
    public function destroy(Request $request, $id)
    {
        // Validate the manager code
        // $request->validate([
        // 'managerCode' => 'required|in:' . env('MANAGER_CODE'),
        // ]);

        // Retrieve the manager code from the request
         $value = $request->input('managerCode');

        // Validate the manager code
         if ($value !== env('MANAGER_CODE', 'manager')) {
        // Redirect back with an error message if the manager code is invalid
        // return redirect()->back()->with('error', 'Invalid Manager Code.');
         }

        $pizza = Pizza::findOrFail($id);
        $pizza->delete();

        return redirect()->back()->with('success', 'Pizza deleted successfully.');
    }



    public function store(Request $request)
    {
        // Validation rules
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'image_url' => 'required|url',
            'description' => 'nullable|string',
            'managerCode' => ['required', 'string', function ($attribute, $value, $fail) {
                if ($value !== env('MANAGER_CODE', 'manager')) {
                    $fail('Invalid Manager Code.');
                }
            }],
        ]);

        // If validation passes, the code will continue to this point
        Pizza::create($validatedData);

        return redirect()->route('pizzas.index')->with('success', 'Pizza added successfully.');
    }
}
