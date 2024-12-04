<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
    */
    public function login(LoginRequest $validatedData)
    {
        $user=User::where('email',$validatedData['email'])->first();
        if($user && Hash::check($validatedData['password'],$user->password))
        {
            $token=$user->createToken($validatedData->userAgent());
            return Response::json([
                'token'=>$token->plainTextToken,
                'user'=>$user
            ],200);
        }
        return response('invalid data',401);
    }
}
