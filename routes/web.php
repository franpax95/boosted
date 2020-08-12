<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

// Route::get( '/{path?}', function(){
//     $user = Auth::user();
//     return view('app', ['user' => $user]);
// } )->where('path', '.*');

Route::get( '/{path?}', function(){
    return view( 'app' );
} )->where('path', '.*');