<?php


namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pizza;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

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
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        try {
            $paymentMethodId = $request->input('paymentMethodId');
            $amount = 1000; // Replace with the actual amount
            $currency = 'usd';

            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
                'payment_method' => $paymentMethodId,
                'confirmation_method' => 'manual',
                'confirm' => true,
            ]);

            // Additional code to handle the payment confirmation
        } catch (\Exception $e) {
            // Handle payment exception
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function showOrderPage()
{
    // Fetch pizzas from the database
    $pizzas = Pizza::all();

    // Pass pizzas to the Inertia view
    return Inertia::render('OrderPage', [
        'pizzas' => $pizzas
    ]);
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
                'total' => $total,
            ];
            
        }

        

        Order::insert($orders);
        // Send email using the email address provided in the form
        $email = $request->input('email');
        // Check if the email address is valid
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Send email using the provided email address
            Mail::raw('Your order has been placed successfully!', function ($message) use ($email) {
                $message->to($email)
                    ->subject('Order Confirmation');
            });

        } else {
            // Handle invalid email address scenario
            return response()->json(['error' => 'Invalid email address'], 400);
        }
        session()->flash('message', 'Order placed successfully!');
        return redirect()->route('order.confirmed');
    }
}
