<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing primary key
            $table->foreignId('pizza_id')->constrained('pizzas'); // Foreign key referencing pizzas table
            $table->integer('quantity'); // Quantity of pizzas ordered
            $table->string('delivery_address'); // Delivery address for the order
            $table->timestamps(); // Automatically creates created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
