<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PizzaController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return Inertia::render('HomePage');
});
Route::get('/', [PizzaController::class, 'index'])->name('home');
Route::post('/pizzas', [PizzaController::class, 'store'])->name('pizzas.store');
Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Menu and Order routes
Route::get('/menu', [PizzaController::class, 'index']);
Route::get('/order', [OrderController::class, 'showOrderPage'])->name('order.page');

Route::post('/order', [OrderController::class, 'store'])->name('order.store');
Route::get('/order/review', function () {
    // You might want to pass the cart and address from session or state
    return Inertia::render('OrderReview', [
        'initialCart' => session('cart', []),
        'initialAddress' => session('address', ''),
    ]);
})->name('order.review');

Route::get('/add-pizza', function () {
    return Inertia::render('AddPizzaForm'); // Ensure the component name matches
})->name('addPizza');

Route::post('/order/store', [OrderController::class, 'store'])->name('order.store');
Route::get('/order/review', [OrderController::class, 'review'])->name('order.review');
Route::post('/order/confirm', [OrderController::class, 'confirm']);
Route::get('/order/confirmed', function () {
    return Inertia::render('OrderConfirm', [
        'message' => session('message', 'Your order has been placed successfully!'),
    ]);
})->name('order.confirmed');

require __DIR__.'/auth.php';
