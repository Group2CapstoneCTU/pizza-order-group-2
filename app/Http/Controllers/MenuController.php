<?php

// app/Http/Controllers/MenuController.php

use Inertia\Inertia;

public function create()
{
    return Inertia::render('Admin/AddMenuItem');
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'nullable|string',
    ]);

    Pizza::create($request->all());

    return redirect()->route('admin.dashboard')->with('success', 'Menu item added successfully.');
}
