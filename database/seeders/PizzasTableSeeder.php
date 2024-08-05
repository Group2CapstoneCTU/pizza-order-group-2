<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PizzasTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('pizzas')->insert([
            ['id' => 1, 'name' => 'Margherita', 'price' => 8.99, 'description' => 'Classic pizza with fresh tomatoes and mozzarella'],
            ['id' => 2, 'name' => 'Pepperoni', 'price' => 9.99, 'description' => 'Pepperoni with mozzarella and tomato sauce'],
            ['id' => 3, 'name' => 'BBQ Chicken', 'price' => 10.99, 'description' => 'BBQ chicken, mozzarella, and red onions'],
            // Add more pizzas as needed
        ]);
    }
}
