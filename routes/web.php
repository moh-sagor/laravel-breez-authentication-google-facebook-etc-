<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocialLoginController;
use App\Http\Controllers\FrontendController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// for frontend 
Route::get('/', [FrontendController::class, 'index'])->name("frontend.home");
Route::get('/user/register', [FrontendController::class, 'userregister'])->name("user.register");
Route::get('/user/login', [FrontendController::class, 'userlogin'])->name("user.login");



// for backend 
Route::get('/gotogoogle', [SocialLoginController::class, 'gotogoogle'])->name('gotogoogle');
Route::get('/apigstore', [SocialLoginController::class, 'apigstore']);
Route::post('/updatepassword{sid}', [SocialLoginController::class, 'updatepassword'])->name("updatepassword");

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';