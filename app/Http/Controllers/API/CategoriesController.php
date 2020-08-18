<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\User;
use App\Category;
use App\Exercise;



class CategoriesController extends Controller
{

    public function index(){
        $user = Auth::user();
        $categories = Category::where('user_id', $user->id)->orderBy('name', 'asc')->get();

        if(count($categories) == 0)
            return response()->json(['error' => 'There is no categories yet'], 401);

        return response()->json(['success' => $categories], 200);
    }

    public function show(int $id){
        try{
            $category = Category::findOrFail($id);
            $user = Auth::user();

            $exercises = Exercise::orderBy('name', 'asc')
            ->where([
                'user_id' => $user->id,
                'category_id' => $category->id
            ])
            ->get();

            return response()->json(['success' => [
                'category' => $category,
                'exercises' => $exercises
            ]], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The category does not exist'], 401);
        }  
    }

    public function store(Request $request){
        $this->validate($request, ['name' => 'required']);

        $user = Auth::user();
        $category = Category::create([
            'name' => $request->name,
            'user_id' => $user->id
        ]);

        return response()->json($category, 201);
    }

    public function update(int $id, Request $request){
        try{
            $category = Category::findOrFail($id);
            $category->update($request->all());
            return response()->json($category, 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The category does not exist'], 401);
        } 
    }

    public function delete(int $id){
        try{
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json(null, 204);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The category does not exist'], 404);
        }
    }
}
