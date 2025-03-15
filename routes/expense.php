<?php

use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('expenses', [ExpenseController::class, 'index'])->name('expenses.index');
  Route::get('expenses/create', [ExpenseController::class, 'create'])->name('expenses.create');
  Route::post('expenses', [ExpenseController::class, 'store'])->name('expenses.store');
  Route::get('expenses/{expense}/edit', [ExpenseController::class, 'edit'])->name('expenses.edit');
  Route::put('expenses/{expense}', [ExpenseController::class, 'update'])->name('expenses.update');
  Route::delete('expenses/{expense}', [ExpenseController::class, 'destroy'])->name('expenses.destroy');
});
