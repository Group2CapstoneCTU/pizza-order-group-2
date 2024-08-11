<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pizza;
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

    public function review()
    {
        // Retrieve the cart and address from the session
        $cart = session('cart', []);
        $address = session('address', '');

        // Fetch pizza details from the database
        $cartWithDetails = collect($cart)->map(function ($item) {
            $pizza = Pizza::find($item['pizzaId']);
            return [
                'pizzaId' => $item['pizzaId'],
                'pizzaName' => $pizza->name,
                'price' => $pizza->price,
                'quantity' => $item['quantity'],
            ];
        })->toArray();

        // Pass the detailed cart to the view
        return Inertia::render('OrderReview', [
            'initialCart' => $cartWithDetails,
            'initialAddress' => $address,
        ]);
    }

    public function processPayment(Request $request)
{
    \Stripe\Stripe::setApiKey('your-secret-key-here');

    try {
        $paymentMethodId = $request->input('paymentMethodId');
        $amount = 1000; // Replace with actual amount
        $currency = 'usd';

        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => $amount,
            'currency' => $currency,
            'payment_method' => $paymentMethodId,
            'confirmation_method' => 'manual',
            'confirm' => true,
        ]);

        if ($paymentIntent->status === 'requires_action' && $paymentIntent->next_action->type === 'use_stripe_sdk') {
            return response()->json([
                'requiresAction' => true,
                'paymentIntentId' => $paymentIntent->id,
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } else {
            return response()->json(['success' => true]);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    public function confirm(Request $request)
    {
        $cart = $request->input('cart');
        $address = $request->input('address');
    
        $orders = [];
        $taxRate = 0.08;
    
        foreach ($cart as $item) {
            $pizza = Pizza::find($item['pizzaId']);
            $subtotal = $pizza->price * $item['quantity'];
            $tax = $subtotal * $taxRate;
            $total = $subtotal + $tax;
    
            $orders[] = [
                'pizza_id' => $item['pizzaId'],
                'quantity' => $item['quantity'],
                'delivery_address' => $address,
                'price' => $subtotal,
                'total' => $total, // Store the total including tax
            ];
        }
    
        Order::insert($orders);
    
        session()->flash('message', 'Order placed successfully!');
        return redirect()->route('order.confirmed');
    }
}

