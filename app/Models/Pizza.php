<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Importing HasFactory for model factories
use Illuminate\Database\Eloquent\Model; // Importing the base Model class for Eloquent models

class Pizza extends Model
{
    use HasFactory; // Use the HasFactory trait for generating model factories

    // Define which attributes are mass assignable
    protected $fillable = [
        'name',         // Pizza name
        'description',  // Description of the pizza
        'price',        // Price of the pizza
        'image_url',    // URL of the pizza image
    ];

    // Define the relationship with the Order model
    public function orders()
    {
        return $this->hasMany(Order::class); // A pizza can have many orders
    }
}
