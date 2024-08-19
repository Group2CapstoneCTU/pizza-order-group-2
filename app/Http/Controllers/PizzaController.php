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
               'image_url' => 'required|url'
           ]);
   
           Pizza::create($request->all());
   
           return redirect()->route('home')->with('success', 'Pizza added successfully!');
       }

       
    }

     
