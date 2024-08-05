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
        $cart = $request->input('cart');
        $address = $request->input('address');

        // Store cart and address in the session for review page
        session(['cart' => $cart, 'address' => $address]);

        return redirect()->route('order.review');
    }

    public function confirm(Request $request)
    {
        $cart = $request->input('cart');
        $address = $request->input('address');

        // Save each item in the cart to the orders table
        foreach ($cart as $item) {
            Order::create([
                'pizza_id' => $item['pizza'],
                'quantity' => $item['quantity'],
                'delivery_address' => $address,
            ]);
        }

        session()->flash('message', 'Order placed successfully!');
        return redirect()->route('order.confirmed');
    }
}