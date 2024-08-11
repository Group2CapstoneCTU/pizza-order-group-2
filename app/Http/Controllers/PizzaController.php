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
           return Inertia::render('MenuPage', ['pizzas' => $pizzas]);
       }

       public function show($id)
       {
           $pizza = Pizza::find($id);
           return Inertia::render('PizzaDetailPage', ['pizza' => $pizza]);
       }

       
   }
