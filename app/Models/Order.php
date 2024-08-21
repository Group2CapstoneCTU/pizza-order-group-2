<?php

// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Importing HasFactory for model factories
use Illuminate\Database\Eloquent\Model; // Importing the base Model class for Eloquent models

class Order extends Model
{
    use HasFactory; // Use the HasFactory trait for generating model factories

    // Define which attributes are mass assignable
    protected $fillable = [
        'pizza_id',           // ID of the pizza associated with the order
        'quantity',          // Quantity of the pizza ordered
        'delivery_address', // Delivery address for the order
    ];

    // Define the relationship with the Pizza model
    public function pizza()
    {
        return $this->belongsTo(Pizza::class, 'pizza_id'); // Each order belongs to one pizza
    }
}
