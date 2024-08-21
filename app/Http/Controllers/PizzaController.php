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



    public function destroy(Request $request, $id)
    {
      // Validate the manager code
    // $request->validate([
        // 'managerCode' => 'required|in:' . env('MANAGER_CODE'),
    // ]);
    
        $pizza = Pizza::findOrFail($id);
        $pizza->delete();
    
        return redirect()->back()->with('success', 'Pizza deleted successfully.');
    }




    // Method to store a new pizza in the database
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',        // Name is required, must be a string, max length 255
            'price' => 'required|numeric',              // Price is required and must be numeric
            'image_url' => 'required|url',              // Image URL is required and must be a valid URL
            'description' => 'nullable|string',         // Description is optional, but if present, must be a string
            // 'managerCode' => 'required|string'          // Manager code is required and must be a string
        ]);



        // Check if the manager code matches the one set in the environment variables
        // if ($request->managerCode !== env('MANAGER_CODE')) {
            // return back()->withErrors(['managerCode' => 'Invalid Manager Code.']); // Return with error if the code is invalid
        // }


        // Proceed with storing the pizza if validation passes
        Pizza::create($request->only('name', 'price', 'image_url', 'description')); // Create the pizza using the validated data



        // Redirect to the pizzas index page with a success message
        return redirect()->route('pizzas.index')->with('success', 'Pizza added successfully.');
    }
}
