<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('categories', [CategoryController::class, 'index'])->name(name: 'categories.index');
  Route::get('categories/create', [CategoryController::class, 'create'])->name(name: 'categories.create');
  Route::post('categories', [CategoryController::class, 'store'])->name(name: 'categories.store');
  Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name(name: 'categories.edit');
  Route::put('categories/{category}', [CategoryController::class, 'update'])->name(name: 'categories.update');
  Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name(name: 'categories.destroy');
});
