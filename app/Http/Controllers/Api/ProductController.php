<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function allProducts(Request $request)
    {
        Log::debug('Authenticated User: ', [$request->user()]);
        $products=Product::paginate(10);
        return ProductResource::collection($products);
    }
    public function oneProduct($id)
    {
        $product=Product::find($id);
        return new ProductResource($product);
    }
    public function storeProduct(ProductRequest $validatedData)
    {
        // dd(Auth::user());
        $product=Product::create([
           'name'=>$validatedData['name'], 
           'price'=>$validatedData['price'], 
           'description'=>$validatedData['description'], 
           'quantity'=>$validatedData['quantity'], 
        ]);
        return response('product added successfully',200);
    }
    public function updateProduct(ProductRequest $validatedData,$id)
    {
        $product=Product::find($id);
        $product->update([
            'name'=>$validatedData['name'], 
            'price'=>$validatedData['price'], 
            'description'=>$validatedData['description'], 
            'quantity'=>$validatedData['quantity'], 
         ]);
         return response('product updated successfully',200);
    }
    public function deleteProduct($id)
    {
        $product=Product::find($id);
        $product->delete();
        return response('product deleted successfully',200);
    }
}
