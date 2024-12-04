<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Delete the current access token
        $request->user()->currentAccessToken()->delete();
    
        // Return a success message
        return response()->json(['message' => 'Logged out successfully']);
    }
}
