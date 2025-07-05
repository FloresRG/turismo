<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/ubicacion', function () {
    return Inertia::render('ubicaciones/ubicacion');
})->name('home');
Route::get('/welcome2', function () {
    return Inertia::render('welcome2');
})->name('welcome2');
Route::get('/welcome3', function () {
    return Inertia::render('welcome3');
})->name('welcome3');
Route::get('/welcome4', function () {
    return Inertia::render('welcome4');
})->name('welcome4');
Route::get('/welcome5', function () {
    return Inertia::render('welcome5');
})->name('welcome5');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
