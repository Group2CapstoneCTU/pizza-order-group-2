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
Route::get('/order', function () {
    return Inertia::render('OrderPage');
});
Route::post('/order', [OrderController::class, 'store'])->name('order.store');

// Remove or comment out the Order confirmation route
// Route::get('/order/confirm', function () {
//     return Inertia::render('OrderConfirm', [
//         'message' => session('message')
//     ]);
// })->name('order.confirm');

require __DIR__.'/auth.php';
