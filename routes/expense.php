<?php

use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('expenses', [ExpenseController::class, 'index'])->name('expenses.index');
  Route::get('expenses/new', [ExpenseController::class, 'create'])->name('expenses.create');
  Route::post('expenses/new', [ExpenseController::class, 'store'])->name('expenses.store');
});
