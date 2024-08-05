<?php
// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'pizza_id' => 'required|exists:pizzas,id',
            'quantity' => 'required|integer|min:1',
            'delivery_address' => 'required|string|max:255',
        ]);

        // Create a new order using the validated data
        $order = Order::create($validated);

        // Return an Inertia response with the success message
        return Inertia::render('OrderPage', [
            'message' => 'Order placed successfully!',
        ]);
    }
}
