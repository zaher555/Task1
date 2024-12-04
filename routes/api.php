<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// login route
Route::post('user/login',[LoginController::class,'login'])->middleware('guest:sanctum');
//logout route
Route::post('user/logout',[LogoutController::class,'logout'])->middleware('auth:sanctum');

//product routes
Route::get('products',[ProductController::class,'allProducts']);
Route::get('product/{id}',[ProductController::class,'oneProduct']);
Route::post('product/store',[ProductController::class,'storeProduct']);
Route::put('product/update/{id}',[ProductController::class,'updateProduct']);
Route::delete('product/delete/{id}',[ProductController::class,'deleteProduct']);