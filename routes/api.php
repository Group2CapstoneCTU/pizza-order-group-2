<?php
   use App\Http\Controllers\PizzaController;
   use App\Http\Controllers\OrderController;
   use Illuminate\Support\Facades\Route; // Import the Route facade

   Route::get('/pizzas', [PizzaController::class, 'index']);
   Route::get('/pizzas/{id}', [PizzaController::class, 'show']);
   Route::post('/orders', [OrderController::class, 'store']);
