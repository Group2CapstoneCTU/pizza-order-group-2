<?php

// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'pizza_id',
        'quantity',
        'delivery_address',
    ];

    public function pizza()
    {
        return $this->belongsTo(Pizza::class, 'pizza_id');
    }
}