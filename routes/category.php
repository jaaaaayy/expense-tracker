<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->controller(CategoryController::class)->group(function () {
  Route::get('categories', 'index')->name(name: 'categories.index');
  Route::get('categories/create', 'create')->name(name: 'categories.create');
  Route::post('categories', 'store')->name(name: 'categories.store');
  Route::get('categories/{category}/edit', 'edit')->name(name: 'categories.edit');
  Route::put('categories/{category}', 'update')->name(name: 'categories.update');
  Route::delete('categories/{category}', 'destroy')->name(name: 'categories.destroy');
});
