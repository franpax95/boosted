<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Routine;
use App\User;
use App\Category;
use App\Exercise;

class RoutinesController extends Controller
{
    public function index(){
        $user = Auth::user();
        $routines = Routine::where('user_id', $user->id)->orderBy('name', 'asc')->get();

        if(count($routines) == 0)
            return response()->json(['error' => 'There is no routines yet'], 404);
        
        foreach($routines as $routine)
            $routine->exercises = json_decode($routine->exercises);

        return response()->json(['success' => $routines], 200);
    }

    public function show(int $id){
        try{
            $routine = Routine::findOrFail($id);
            $exercises = [];
            $routine->exercises = json_decode($routine->exercises);

            foreach($routine->exercises as $ex){
                $exercise = Exercise::where('id', $ex->id)->first();
                $category = Category::where('id', $exercise->category_id)->first();
        
                $exercise->category = $category;
                unset($exercise->category_id);

                array_push($exercises, $exercise);
            }

            return response()->json(['success' => [
                'routine' => $routine,
                'exercises' => $exercises
            ]], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The routine does not exist'], 404);
        }
    }

    public function store(Request $request){
        $this->validate($request, [
            'name' => 'required'
        ]);

        $user = Auth::user();
        $routine = Routine::create([
            'name' => $request->input('name'),
            'user_id' => $user->id,
            'description' => $request->input('description'),
            'exercises' => json_encode($request->input('exercises'))
        ]);

        return response()->json($routine, 201);
    }

    public function delete(int $id){
        try{
            $routine = Routine::findOrFail($id);
            $routine->delete();
            return response()->json(null, 204);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The routine does not exist'], 404);
        }
    }
}
