<?php

use App\Models\Category;
use App\Models\Expense;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $totalCategories = Category::where('user_id', Auth::id())->count();
        $totalExpenses = Expense::where('user_id', Auth::id())->count();
        $expenses = Expense::with(['user', 'category'])->where('user_id', Auth::id())->latest()->limit(10)->get();
        return Inertia::render('dashboard', ['expenses' => $expenses, 'totalCategories' => $totalCategories, 'totalExpenses' => $totalExpenses]);
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/expense.php';
require __DIR__ . '/category.php';
