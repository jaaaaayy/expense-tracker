<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('categories', [CategoryController::class, 'index'])->name(name: 'caegories.index');
});
