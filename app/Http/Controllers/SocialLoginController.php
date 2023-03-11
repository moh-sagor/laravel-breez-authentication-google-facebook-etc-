<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;



class SocialLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function gotogoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function apigstore(Request $request)
    {
        $socialUser = Socialite::driver('google')->user();
        $user = User::where('sid', $socialUser->id)->first();
        if ($user == null) {
            $store = new User();
            $store->uname = $socialUser->email;
            $store->fname = $socialUser->user['given_name'];
            $store->lname = $socialUser->user['family_name'];
            $store->email = $socialUser->email;
            $store->pic = $socialUser->avatar;
            $store->password = Hash::make($socialUser->email);
            $store->sid = $socialUser->id;
            $store->save();
            Auth::login($store);
            return redirect(RouteServiceProvider::HOME);

        } else {
            Auth::login($user);
            return redirect(RouteServiceProvider::HOME);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}