<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Exercise;
use App\User;
use App\Category;

class ExercisesController extends Controller
{
    public function index(){
        $user = Auth::user();
        $exercises = Exercise::orderBy('name', 'asc')->where('user_id', $user->id)->get();

        if(count($exercises) == 0){
            return response()->json(['error' => 'There is no exercises yet'], 401);
        }else{
            foreach($exercises as $exercise){
                $category = Category::where('id', $exercise->category_id)->get();
                $exercise->category = $category[0];
                unset($exercise->category_id);
            }
        }

        return response()->json(['success' => $exercises], 200);
    }

    public function show(int $id){
        try{
            $exercise = Exercise::findOrFail($id);
            $user = Auth::user();

            $category = Category::where([
                'id' => $exercise->category_id,
                'user_id' => $user->id
            ])->get();

            $exercise->category = $category[0];
            unset($exercise->category_id);

            return response()->json(['success' => $exercise], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The exercise does not exist'], 401);
        }
    }

    public function store(Request $request){
        $this->validate($request, ['name' => 'required']);

        $user = Auth::user();
        $exercise = Exercise::create(['user_id' => $user->id] + $request->all());

        if($request->file('image')){
            $img = $request->file('image')->store('exercises', 'public');
            $exercise->image = '/storage/' . $img;
            $exercise->save();
        }

        return response()->json(['success' => $exercise], 200);
    }

    public function update(int $id, Request $request){
        try{
            $exercise = Exercise::findOrFail($id);
            $user = Auth::user();

            $exercise->name         = $request->name;
            $exercise->description  = $request->description;
            $exercise->category_id  = $request->category_id;

            if($request->file('image')){
                if (strpos($exercise->image, 'storage') !== false){
                    $url_img = str_replace('/storage', '', $exercise->image);
                    Storage::disk('public')->delete($url_img);
                }
                
                $img = $request->file('image')->store('exercises', 'public');
                $exercise->image = '/storage/' . $img;
            }
    
            $exercise->save();

            return response()->json(['success' => $exercise], 200);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The exercise does not exist'], 401);
        }
    }

    public function delete(int $id){
        try{
            $exercise = Exercise::findOrFail($id);
            if (strpos($exercise->image, 'storage') !== false){
                $url_img = str_replace('/storage', '', $exercise->image);
                Storage::disk('public')->delete($url_img);
            }

            $exercise->delete();
            return response()->json(null, 204);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => 'The category does not exist'], 404);
        }
    }
}
