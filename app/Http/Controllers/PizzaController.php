<?php
   // app/Http/Controllers/PizzaController.php
   namespace App\Http\Controllers;

   use App\Models\Pizza;
   use Illuminate\Http\Request;
   use Inertia\Inertia;

   class PizzaController extends Controller
   {
    
       public function index()
       {
           $pizzas = Pizza::all();
           return Inertia::render('HomePage', ['pizzas' => $pizzas]);
           return Inertia::render('Pizza', [
           'pizzas' => $pizzas,
        ]);
       }

       public function show($id)
       {
           $pizza = Pizza::find($id);
           return Inertia::render('PizzaDetailPage', ['pizza' => $pizza]);
       }

       public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'image_url' => 'required|url',
        'description' => 'nullable|string',
        'managerCode' => 'required|string'
    ]);

    // Check if the manager code matches
    if ($request->managerCode !== env('MANAGER_CODE')) {
        return back()->withErrors(['managerCode' => 'Invalid Manager Code.']);
    }

    // Proceed with storing the pizza if validation passes
    Pizza::create($request->only('name', 'price', 'image_url', 'description'));

    return redirect()->route('pizzas.index')->with('success', 'Pizza added successfully.');
}
   }

     
