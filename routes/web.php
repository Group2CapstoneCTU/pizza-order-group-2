<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PizzaController;
use App\Http\Controllers\OrderController;

// Route for the home page
Route::get('/', [PizzaController::class, 'index'])->name('home');

// Route for storing a new pizza
Route::post('/pizzas', [PizzaController::class, 'store'])->name('pizzas.store');

// Route to handle deleting pizza
Route::delete('/pizzas/{id}', [PizzaController::class, 'destroy'])->name('pizzas.destroy');


// Route for listing all pizzas
Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index');


// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Authentication-related routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Order-related routes
Route::get('/order', [OrderController::class, 'showOrderPage'])->name('order.page');
Route::post('/order', [OrderController::class, 'store'])->name('order.store');
Route::get('/order/review', [OrderController::class, 'review'])->name('order.review');
Route::post('/order/confirm', [OrderController::class, 'confirm'])->name('order.confirm');

// Route for the add pizza form
Route::get('/add-pizza', function () {
    return Inertia::render('AddPizzaForm');
})->name('addPizza');

// Order confirmation page
Route::get('/order/confirmed', function () {
    return Inertia::render('OrderConfirm', [
        'message' => session('message', 'Your order has been placed successfully!'),
    ]);
})->name('order.confirmed');

// Load authentication routes
require __DIR__.'/auth.php';
