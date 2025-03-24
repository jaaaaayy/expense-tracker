<?php

use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->controller(ExpenseController::class)->group(function () {
  Route::get('expenses', 'index')->name('expenses.index');
  Route::get('expenses/create', 'create')->name('expenses.create');
  Route::post('expenses', 'store')->name('expenses.store');
  Route::get('expenses/{expense}/edit', 'edit')->name('expenses.edit');
  Route::put('expenses/{expense}', 'update')->name('expenses.update');
  Route::delete('expenses/{expense}', 'destroy')->name('expenses.destroy');
});
