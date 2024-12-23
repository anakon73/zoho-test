<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\DealController;


Route::get('/accounts', [AccountController::class, 'index']);
Route::post('/accounts', [AccountController::class, 'create']);

Route::post('/deals', [DealController::class, 'create']);
