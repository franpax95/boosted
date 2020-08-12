<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');
Route::post('logout', 'API\AuthController@logout');
 
Route::middleware('auth:api')->group(function(){
    Route::get('user_detail', 'API\AuthController@user_detail');
});

/**
 * CATEGORIES
 */
Route::middleware('auth:api')->get('categories/', 'API\CategoriesController@index');
Route::middleware('auth:api')->get('categories/{category}', 'API\CategoriesController@show');
Route::middleware('auth:api')->post('categories', 'API\CategoriesController@store');
Route::middleware('auth:api')->post('categories/{category}', 'API\CategoriesController@update');
Route::middleware('auth:api')->delete('categories/{category}', 'API\CategoriesController@delete');


/**
 * EXERCISES
 */
Route::middleware('auth:api')->get('exercises', 'API\ExercisesController@index');
Route::middleware('auth:api')->get('exercises/{exercise}', 'API\ExercisesController@show');
Route::middleware('auth:api')->post('exercises', 'API\ExercisesController@store');
Route::middleware('auth:api')->post('exercises/{exercise}', 'API\ExercisesController@update');
Route::middleware('auth:api')->delete('exercises/{exercise}', 'API\ExercisesController@delete');

/**
 * ROUTINES
 */
Route::middleware('auth:api')->get('routines', 'API\RoutinesController@index');
Route::middleware('auth:api')->get('routines/{routine}', 'API\RoutinesController@show');
Route::middleware('auth:api')->post('routines', 'API\RoutinesController@store');