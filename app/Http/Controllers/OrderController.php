<?php

namespace App\Http\Controllers;

use App\Models\Order;             // Importing the Order model for database interactions
use App\Models\Pizza;             // Importing the Pizza model for database interactions
use Illuminate\Http\Request;      // Importing the Request class to handle HTTP requests
use Inertia\Inertia;              // Importing Inertia for rendering React components
use Illuminate\Support\Facades\Mail; // Importing Mail for sending emails

class OrderController extends Controller
{
    // Method to store the cart and address in the session and redirect to the review page
    public function store(Request $request)
    {
        $cart = $request->input('cart');            // Get the cart data from the request
        $address = $request->input('address');      // Get the delivery address from the request

        // Store cart and address in the session for use in the review page
        session(['cart' => $cart, 'address' => $address]);

        // Redirect the user to the order review page
        return redirect()->route('order.review');
    }

    // Method to review the order before final confirmation
    public function review()
    {
        // Retrieve the cart and address from the session
        $cart = session('cart', []);                // Default to an empty array if cart is not found
        $address = session('address', '');          // Default to an empty string if address is not found

        // Fetch pizza details from the database for each item in the cart
        $cartWithDetails = collect($cart)->map(function ($item) {
            $pizza = Pizza::find($item['pizzaId']); // Find the pizza by its ID
            return [
                'pizzaId' => $item['pizzaId'],
                'pizzaName' => $pizza->name,
                'price' => $pizza->price,
                'quantity' => $item['quantity'],
            ];
        })->toArray(); // Convert the collection to an array

        // Render the OrderReview component with the detailed cart and address
        return Inertia::render('OrderReview', [
            'initialCart' => $cartWithDetails,
            'initialAddress' => $address,
        ]);
    }

    // Method to process the payment using Stripe
    public function processPayment(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret')); // Set the Stripe API key

        try {
            $paymentMethodId = $request->input('paymentMethodId'); // Get the payment method ID from the request
            $amount = 1000; // Replace with the actual amount to be charged
            $currency = 'usd'; // Set the currency to USD

            // Create a payment intent with Stripe
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
                'payment_method' => $paymentMethodId,
                'confirmation_method' => 'manual', // Manual confirmation
                'confirm' => true, // Confirm the payment immediately
            ]);

            // Additional code to handle payment confirmation can be added here
        } catch (\Exception $e) {
            // Handle any exceptions during the payment process
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Method to show the order page with the list of pizzas
    public function showOrderPage()
    {
        $pizzas = Pizza::all(); // Fetch all pizzas from the database

        // Render the OrderPage component and pass the pizzas data
        return Inertia::render('OrderPage', [
            'pizzas' => $pizzas
        ]);
    }

    // Method to confirm the order, store it in the database, and send an email confirmation
    public function confirm(Request $request)
    {
        $cart = $request->input('cart');            // Get the cart data from the request
        $address = $request->input('address');      // Get the delivery address from the request

        $orders = [];                               // Initialize an empty array to store order data
        $taxRate = 0.08;                            // Set the tax rate to 8%

        // Loop through each item in the cart and calculate the order details
        foreach ($cart as $item) {
            $pizza = Pizza::find($item['pizzaId']); // Find the pizza by its ID
            $subtotal = $pizza->price * $item['quantity']; // Calculate the subtotal for the item
            $tax = $subtotal * $taxRate;            // Calculate the tax for the item
            $total = $subtotal + $tax;              // Calculate the total cost including tax

            // Add the order details to the orders array
            $orders[] = [
                'pizza_id' => $item['pizzaId'],
                'quantity' => $item['quantity'],
                'delivery_address' => $address,
                'price' => $subtotal,
                'total' => $total,
            ];
        }

        // Insert all orders into the database
        Order::insert($orders);

        // Send email confirmation to the user
        $email = $request->input('email');          // Get the user's email address from the request

        // Check if the email address is valid
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Send a plain text email to the user
            Mail::raw('Your order has been placed successfully!', function ($message) use ($email) {
                $message->to($email)
                    ->subject('Order Confirmation'); // Set the subject of the email
            });
        } else {
            // Handle the scenario where the email address is invalid
            return response()->json(['error' => 'Invalid email address'], 400);
        }

        // Flash a success message to the session and redirect to the order confirmation page
        session()->flash('message', 'Order placed successfully!');
        return redirect()->route('order.confirmed');
    }
}
